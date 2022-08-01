// * react/next
import Head from "next/head";
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import PrivatChatContext from 'context/PrivatChat/PrivatChatContext'
import GroupChatContext from 'context/GroupChat/GroupChatContext'

// * redux
import {useSelector} from 'react-redux'

// * supabase
import { supabase } from 'supabase/supabaseClient';
import { updateUserTypingAnyway, updateUserTypingChat } from 'supabase/modules/user'
import { fetchOnePrivatChat, fetchOneGroupChat } from 'supabase/modules/chat'
import { addMessage} from 'supabase/modules/message'

// * howler
import { Howl } from 'howler';

// * components
import PrivatChatHeader from './PrivatChatHeader/index';
import GroupChatHeader from './GroupChatHeader/index';
import ChatWindow from './ChatWindow';

const useStore = () => {
    const [users] = useState(new Map())
    const [newOrUpdatedUser, handleNewOrUpdatedUser] = useState(null)

    useEffect(() => {
        const userListener = supabase
            .from('users')
            .on('*', payload => {
                handleNewOrUpdatedUser(payload.new)
            })
            .subscribe()

        return () => {
            userListener.unsubscribe()
        }
    }, [])

    useEffect(() => {
        if (newOrUpdatedUser) users.set(newOrUpdatedUser.id, newOrUpdatedUser)
      }, [newOrUpdatedUser])

    return {newOrUpdatedUser}
}

export default function ChatsPage() {
    const [typingData, setTypingData] = useState(null)

    const router = useRouter()
    const { id: chatId } = router.query

    const {newOrUpdatedUser} = useStore({chatId})

    const {setPrivatChatData} = useContext(PrivatChatContext)
    const {setGroupChatData} = useContext(GroupChatContext)
    const {user, avatar} = useSelector(state => state.auth)
    const {messages} = useSelector(state => state.chat)

    const callSound = (src) => {
        const sound = new Howl({
            src,
            html5: true
        })
        sound.play()
    }


    const userCondition = newOrUpdatedUser !== null && user !== null && user.id !== newOrUpdatedUser.id
    const typingDataObj = {
        typing: newOrUpdatedUser?.is_typing, 
        name: newOrUpdatedUser?.username || newOrUpdatedUser?.username_google, 
        chat: newOrUpdatedUser?.typing_chat
    }

    // ** функция отправки сообщения 
    const sendMessage = (value) => {
        const authorCondition =  user.user_metadata.name ? user.user_metadata.name : user.user_metadata.username
        const message = {
            message: value,
            user_id: user.id,
            chat_id: chatId,
            author: authorCondition,
            author_avatar: avatar
        }
        addMessage(message)
        callSound('/sendMessage.mp3')
    }

    // ** при изменении newOrUpdatedUser записыват данные о том печатает ли пользователь в state
    useEffect(() => {
        if (userCondition) {
            setTypingData(typingDataObj)
        }
    }, [newOrUpdatedUser, userCondition])

    // ** при изменении адреса обновляет данные о пользователе
    useEffect(() => {
        if (user !== null) {
            updateUserTypingChat(user.id, router.query.id)
            updateUserTypingAnyway(user.id)
        }
        if (userCondition) {
            setTypingData(typingDataObj)
        }
    }, [router.query.id, userCondition])

    // ** при изменении маршрута в зависимости от типа чата записывает соответствующие данные 
    useEffect(() => {
        if (router.query.type === 'p') {
            const data = fetchOnePrivatChat(router.query.id)
            data.then(chat => setPrivatChatData(chat))
        }
        if (router.query.type === 'g') {
            const data = fetchOneGroupChat(router.query.id)
            data.then(chat => setGroupChatData(chat))
        }
    }, [router.query.id])

    return (
        <>
            <Head>
                <title>
                    Chat
                </title>
            </Head>
            <div id='chat' className='z-50 transition-all duration-[0.4s] w-full fixed xl:relative top-0 left-0 bottom-0 right-0 border-l-2 border-solid border-gray-200 dark:border-gray-800'>
                {
                    router.query.type === 'p' 
                    ? <PrivatChatHeader/>
                    : null
                }
                {
                    router.query.type === 'g' 
                    ? <GroupChatHeader/>
                    : null
                }
                <ChatWindow 
                    sendMessage={sendMessage} 
                    messages={messages} 
                    typingData={typingData}
                />
            </div>
        </>
    )
}

