// * hooks 
import {useGroupChatHeader} from './useGroupChatHeader'

// * components
import ChatHeader from './ChatHeader/index'
import ChatMenu from './ChatMenu'

export default function GroupChatHeader() {
    const {
        models: {
            groupChatData
        }
    } = useGroupChatHeader()

    return (
        <>
            {
                groupChatData
                ? (
                    <>
                        <ChatHeader/>
                        <ChatMenu/>
                    </>
                ) : null
            }
        </>
    )
}