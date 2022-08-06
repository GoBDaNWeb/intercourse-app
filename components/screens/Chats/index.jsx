// * react/next
import {memo} from 'react'
import Head from "next/head";
import { useRouter } from 'next/router';

// * hooks 
import {useChats} from './useChats'

// * components
import PrivatChatHeader from './PrivatChatHeader/index';
import GroupChatHeader from './GroupChatHeader/index';
import ChatWindow from './ChatWindow';
import ChatFooter from './ChatFooter';

export default memo(function ChatsPage() {
    const router = useRouter()

    const {
        models: {
            typingData,
            privatChatData,
            groupChatData
        }
    } = useChats()
    
    return (
        <>
            <Head>
                <title>
                    Chat
                </title>
            </Head>
            <div id='chat' className='z-50 transition-all duration-[0.4s] w-full fixed xl:relative top-0 left-0 bottom-0 right-0 border-l-2 border-solid border-gray-200 dark:border-gray-800'>
                {
                    privatChatData && router.query.type === 'p' 
                    ? <PrivatChatHeader/>
                    : null
                }
                {
                    groupChatData && router.query.type === 'g' 
                    ? <GroupChatHeader/>
                    : null
                }
                <ChatWindow/>
                <ChatFooter typingData={typingData}/>
            </div>
        </>
    )
})

