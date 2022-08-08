// * react/next
import {memo, useState, useEffect} from 'react'
import Head from "next/head";
import { useRouter } from 'next/router';

// * redux
import {useSelector, useDispatch} from 'react-redux'
import {setPrivatChatData, setGroupChatData} from 'store/chatSlice'

// * hooks 
import {useUser} from 'hooks/useUser'

// * supabase
import { updateUserTypingAnyway, updateUserTypingChat } from 'supabase/modules/user'
import { fetchOnePrivatChat, fetchOneGroupChat } from 'supabase/modules/chat'

// * components
import PrivatChatHeader from './PrivatChatHeader/index';
import GroupChatHeader from './GroupChatHeader/index';
import ChatWindow from './ChatWindow';
import ChatFooter from './ChatFooter';

const ChatsPage = memo(() => {
    const [typingData, setTypingData] = useState(null)

    const dispatch = useDispatch()
    const router = useRouter()
    const {newOrUpdatedUser} = useUser()

    const {user} = useSelector(state => state.auth)
    const {privatChatData, groupChatData} = useSelector(state => state.chat)

    const { id: chatId } = router.query
    
    const userCondition = user?.id !== newOrUpdatedUser?.id

    const typingDataObj = {
        typing: newOrUpdatedUser?.is_typing, 
        name: newOrUpdatedUser?.username || newOrUpdatedUser?.username_google, 
        chat: newOrUpdatedUser?.typing_chat
    }

    useEffect(() => {
        updateUserTypingChat(user.id, chatId)
        updateUserTypingAnyway(user.id)
        userCondition && setTypingData(typingDataObj)
    }, [chatId, userCondition, user])

    const fetchPrivatChat = async () => {
        const response = await fetchOnePrivatChat(chatId)
        dispatch(setPrivatChatData(response))
    }

    const fetchGroupChat = async () => {
        const response = await fetchOneGroupChat(chatId)
        dispatch(setGroupChatData(response))
    }

    useEffect(() => {
        router.query.type === 'p' && fetchPrivatChat()
        router.query.type === 'g' && fetchGroupChat()
    }, [chatId, router.query.type])
 
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
                    && <PrivatChatHeader/>
                }
                {
                    groupChatData && router.query.type === 'g' 
                    && <GroupChatHeader/> 
                }
                <ChatWindow/>
                <ChatFooter typingData={typingData}/>
            </div>
        </>
    )
})

ChatsPage.displayName = 'ChatsPage';

export default ChatsPage