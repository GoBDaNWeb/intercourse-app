// * react/next
import {useState} from 'react'

// * redux
import {useSelector} from 'react-redux'

// * supabase
import {supabase} from 'supabase/supabaseClient'


export function useProfile() {
    const [loading, setLoading] = useState(false)
    const [avatar_url, setAvatarUrl] = useState(null)

    const {isProfileOpen} = useSelector(state => state.profile)
    const {user} = useSelector(state => state.auth)

    async function updateAvatar({ avatar_url }) {
        try {
          setLoading(true)
          const user = supabase.auth.user()
    
          const updates = {
            id: user.id,
            avatar_url,
            updated_at: new Date(),
          }
    
          let { error } = await supabase.from('users').upsert(updates, {
            returning: 'minimal', // Don't return the value after inserting
          })
    
          if (error) {
            throw error
          }
        } catch (error) {
          alert(error.message)
        } finally {
          setLoading(false)
        }
    }

    const uploadUserAvatar = (url) => {
        setAvatarUrl(url)
        updateAvatar({ avatar_url: url })
    }

    const username = user?.user_metadata.name ? user?.user_metadata.name : user?.user_metadata.username

    return {
        models: {
            user,
            avatar_url,
            isProfileOpen,
            username
        }, 
        commands: {
            uploadUserAvatar
        }
    }
}