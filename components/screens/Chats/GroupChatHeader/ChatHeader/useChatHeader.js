// * react/next
import {useRouter} from 'next/router'

// * redux
import {useDispatch, useSelector} from 'react-redux'
import {setOpenMenuGroupChatHeader} from 'store/chatSlice'

export function useChatHeader() {
    const dispatch = useDispatch()

    const router = useRouter()
    const {user} = useSelector(state => state.auth)
    const {isOpenMenuGroupChatHeader, groupChatData} = useSelector(state => state.chat)

    const redirectToMain = () => {
        router.push('/main')
    }

    const handleOpenMenu = () => {
        dispatch(setOpenMenuGroupChatHeader(!isOpenMenuGroupChatHeader))
    }

    return {
        models: {
            user,
            groupChatData
        },
        commands: {
            redirectToMain,
            handleOpenMenu
        }
    }
}