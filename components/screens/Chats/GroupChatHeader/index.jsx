// * react/next
import {useEffect, useContext} from 'react'
import {useRouter} from 'next/router'
import GroupChatContext from 'context/GroupChat/GroupChatContext'

// * components
import ChatHeader from './ChatHeader/index'
import ChatMenu from './ChatMenu'

export default function GroupChatHeader() {
    const {setIsOpenMenu} = useContext(GroupChatContext)
    const router = useRouter()
    
    useEffect(() => {
        setIsOpenMenu(false)
    }, [router.query.id])

    return (
        <>
            <ChatHeader/>
            <ChatMenu/>
        </>
    )
}