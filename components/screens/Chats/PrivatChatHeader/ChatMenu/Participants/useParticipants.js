// * redux 
import {useSelector} from 'react-redux'

export function useParticipants() {
    const {user} = useSelector(state => state.auth)
    const {privatChatData} = useSelector(state => state.chat)

    return {
        models: {
            privatChatData,
            user
        }
    }
}