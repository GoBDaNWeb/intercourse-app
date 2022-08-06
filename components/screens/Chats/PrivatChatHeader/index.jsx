import {memo} from 'react'

// * hooks 
import {usePrivatChatHeader} from './usePrivatChatHeader'

// * components
import ChatHeader from './ChatHeader'
import ChatMenu from './ChatMenu'

export default memo(function PrivatChatHeader() {
    usePrivatChatHeader()
    return (
        <>
            <ChatHeader />
            <ChatMenu />
        </>
    )
})