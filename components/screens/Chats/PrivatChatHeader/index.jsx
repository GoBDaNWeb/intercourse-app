// * react/next
import { useContext, useEffect } from 'react'
import {useRouter} from 'next/router'
import PrivatChatContext from 'context/PrivatChat/PrivatChatContext'

// * components
import ChatHeader from './ChatHeader'
import ChatMenu from './ChatMenu'

export default function PrivatChatHeader() {
    const router = useRouter()
    const {setIsOpenMenu} = useContext(PrivatChatContext)
    useEffect(() => {
        setIsOpenMenu(false)
    }, [router.query.id])
    
    return (
        <>
            <ChatHeader />
            <ChatMenu />
        </>
    )
}