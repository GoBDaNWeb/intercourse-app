// * react/next
import {useRouter} from 'next/router'

// * redux
import {useSelector, useDispatch} from 'react-redux'
import {setOpenMenuPrivatChatHeader} from 'store/chatSlice'


export function useChatHeader() {
    const router = useRouter()
    const {user} = useSelector(state => state.auth)
    const {isOpenMenuPrivatChatHeader, privatChatData} = useSelector(state => state.chat)

    const dispatch = useDispatch()

    const redirectToMain = () => {
        router.push('/main')
    }

    const handleOpenMenu = () => {
        dispatch(setOpenMenuPrivatChatHeader(!isOpenMenuPrivatChatHeader))
    }

    return {
        models: {
            user,
            isOpenMenuPrivatChatHeader,
            privatChatData
        },
        commands: {
            redirectToMain,
            handleOpenMenu
        }
    }
}