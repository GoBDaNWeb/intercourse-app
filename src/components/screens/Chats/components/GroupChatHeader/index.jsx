// * react/next
import {useEffect} from 'react'
import {useRouter} from 'next/router'

// * redux
import {useDispatch, useSelector} from 'react-redux'
import {setOpenMenuGroupChatHeader} from 'store/chatSlice'

// * components
import ChatHeader from './ChatHeader/index'
import ChatMenu from './ChatMenu'

const GroupChatHeader = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const {groupChatData} = useSelector(state => state.chat)

    useEffect(() => {
        dispatch(setOpenMenuGroupChatHeader(false))
    }, [router.query.id])

    return (
        <>
            {
                groupChatData
                && (
                    <>
                        <ChatHeader/>
                        <ChatMenu/>
                    </>
                ) 
            }
        </>
    )
}

export default GroupChatHeader