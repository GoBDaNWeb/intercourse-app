// * hooks 
import {useGroupChatList} from './useGroupChatList'

// * components
import PreviewGroupChat from '../PreviewGroupChat/index';
import { ThreeDots } from 'react-loader-spinner';

export default function GroupChatList() {
    const {
        models: {
            chatListCondition,
            filteredChats,
            searchChatCondition,
            searchChats,
            loadingChatsCondition
        }
    } = useGroupChatList()
  
    return (
            <div className='flex flex-col h-full overflow-y-auto w-full custom-scroll'>
                {

                    chatListCondition
                    && filteredChats.map((chat) => (
                        <PreviewGroupChat key={chat.id} chatData={chat}/>
                    ))
                }
                {
                    searchChatCondition
                    && searchChats.map((chat) => (
                        <PreviewGroupChat key={chat.id} chatData={chat}/>
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
}