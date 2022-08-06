// * redux 
import {useSelector, useDispatch} from 'react-redux'
import {setTheirProfileData, handleOpenTheirProfile} from 'store/profileSlice'

export function useChatWindow(message = null) {
    const {messages} = useSelector(state => state.chat)
    const {user} = useSelector(state => state.auth)
    const {bgChat} = useSelector(state => state.chat)
    const {isTheirProfileOpen} = useSelector(state => state.profile)

    const dispatch = useDispatch()

    const openProfile = () => {
        dispatch(setTheirProfileData(message.user_id))
        if (!isTheirProfileOpen) {
            dispatch(handleOpenTheirProfile())
        }
    }

    return {
        models: {
            messages,
            user,
            bgChat,
            isTheirProfileOpen
        },
        commands: {
            openProfile
        }
    }
}