// * react 
import {memo} from 'react'

// * hooks 
import {usePrivatChatList} from './usePrivatChatList'

// * components
import PreviewPrivatChat from '../PreviewPrivatChat'
import { ThreeDots } from 'react-loader-spinner'

export default memo(function ChatList() {
    const {
        models: {
            searchValue,
            filteredChats,
            searchChats,
            chatListCondition,
            searchChatCondition,
            loadingChatsCondition
        }
    } = usePrivatChatList()

    return (
        <div className='flex flex-col h-full overflow-y-auto w-full custom-scroll'>
            {
                chatListCondition
                && filteredChats.map((chat) => (
                    <PreviewPrivatChat key={chat.id} chatData={chat}/>
                ))
            }
            {
                searchChatCondition
                && searchChats.map((chat) => (
                    <PreviewPrivatChat key={chat.id} chatData={chat}/>
                )) 
            }
            {   loadingChatsCondition
                && (
                    <div className='flex w-full justify-center'>
                        <ThreeDots color="#22C55E"/>
                    </div>
                )
            }
        </div>
        
    )
})