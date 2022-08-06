import {memo} from 'react'

// * hooks 
import {usePrivatChatHeader} from './usePrivatChatHeader'

// * components
import ChatHeader from './ChatHeader'
import ChatMenu from './ChatMenu'

export default memo(function PrivatChatHeader() {
    const {
        models: {
            privatChatData
        }
    } = usePrivatChatHeader()
    return (
        <>
        {
            privatChatData
            ? (
                <>
                    <ChatHeader/>
                    <ChatMenu/>
                </>
            ) : null
        }
    </>
    )
})