// * react/next
import {useRouter} from 'next/router'

// * redux
import {useSelector, useDispatch} from 'react-redux'
import {handleOpenProfile} from 'store/profileSlice'
import {signOut} from 'store/authSlice'

// * supabase
import {updateUserStatus} from 'supabase/modules/user'

export function usePreviewProfileUser() {
    const {user} = useSelector(state => state.auth)
    const {isProfileOpen} = useSelector(state => state.profile)

    const router = useRouter()

    const dispatch = useDispatch()

    // ** функция выхода из аккаунта
    const handleSignOut = () => {
        updateUserStatus(user.id, 'OFFLINE')
        dispatch(signOut())
        router.push('/')
    }

    const openProfile = () => {
        dispatch(handleOpenProfile())
    }
    
    const username = user?.user_metadata.name ? user?.user_metadata.name : user?.user_metadata.username

    return {
        models: {
            isProfileOpen,
            user,
            username
        },
        commands: {
            handleSignOut,
            openProfile
        }
    }
}