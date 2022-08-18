// * react/next
import {memo, useEffect} from 'react'
import {useRouter} from 'next/router'

// * redux 
import {useDispatch, useSelector} from 'react-redux'
import {setOpenMenuPrivatChatHeader} from 'store/chatSlice'

// * components
import ChatHeader from './ChatHeader'
import ChatMenu from './ChatMenu'

const PrivatChatHeader = memo(() => {
    const router = useRouter()
    const dispatch = useDispatch()
    const {privatChatData} = useSelector(state => state.chat)

    useEffect(() => {
        dispatch(setOpenMenuPrivatChatHeader(false))
    }, [router.query.id])

    return (
        <>
            {
                privatChatData
                && (
                    <>
                        <ChatHeader/>
                        <ChatMenu/>
                    </>
                ) 
            }
        </>
    )
})

PrivatChatHeader.displayName = 'PrivatChatHeader';

export default PrivatChatHeader