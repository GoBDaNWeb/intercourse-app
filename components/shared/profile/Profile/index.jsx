// * react/next
import {useState, memo} from 'react'
import {useRouter} from 'next/router'

// * redux
import {useDispatch, useSelector} from 'react-redux'
import {signOut} from 'store/authSlice'
import {setBgChat} from 'store/chatSlice'

// * supabase
import {supabase} from 'utils/supabaseClient'
import {updateUserStatus} from 'utils/Store'

// * components
import AvatarUpload from 'components/shared/profile/Profile/AvatarUpload'
import Switcher from '/components/shared/Switcher'
import ThemePicker from './ThemePicker'
import Buttons from './Buttons'

export default memo(function Profile() {
    const [loading, setLoading] = useState(false)
    const [avatar_url, setAvatarUrl] = useState(null)

    const {isProfileOpen} = useSelector(state => state.profile)
    const {user} = useSelector(state => state.auth)

    // ? Не реадизованно
    async function updateProfile({ avatar_url }) {
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
        
    const username = user?.user_metadata.name ? user?.user_metadata.name : user?.user_metadata.username

    return(
        <>
            {
                isProfileOpen
                && (
                    <div className='flex flex-col items-center py-10 justify-center w-full '>
                        <div className='flex flex-col items-center'>
                            <AvatarUpload
                                url={avatar_url}
                                size={208}
                                onUpload={(url) => {
                                    setAvatarUrl(url)
                                    updateProfile({ avatar_url: url })
                                }}
                            />
                            <div className='text-center mt-2'>
                                <h2 className='font-semibold text-4xl text-primary'>
                                    {username}
                                </h2>
                                <h4 className='text-secondary'>
                                    {user?.email}
                                </h4>
                            </div>
                            <Switcher/>
                            <ThemePicker/>
                        </div>
                       <Buttons/>
                    </div>
                ) 
            }
        </>
    )
})