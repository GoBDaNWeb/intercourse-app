// * react/next
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'

// * redux
import {useSelector} from 'react-redux'

// * supabase
import { supabase } from 'utils/supabaseClient';
import { addMessage, updateMessage, updateUserTypingAnyway, updateUserTypingChat, fetchOnePrivatChat, fetchOneGroupChat } from 'utils/Store'

// * howler
import { Howl } from 'howler';

// * components
import PrivatChatHeader from 'components/chat/PrivatChatHeader';
import GroupChatHeader from 'components/chat/GroupChatHeader';
import ChatWindow from 'components/chat/ChatWindow';

export async function getServerSideProps({locale}) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
}


export default function ChatsPage() {
    const [privatChatData, setPrivatChatData] = useState(null)
    const [groupChatData, setGroupChatData] = useState(null)
    const [typingData, setTypingData] = useState(null)

    const router = useRouter()
    const { id: chatId } = router.query
    const {user} = useSelector(state => state.auth)
    const {messages} = useSelector(state => state.chat)

    const useStore = (props) => {
        // const [messages, setMessages] = useState([])
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

    const {newOrUpdatedUser} = useStore({chatId})

    const callSound = (src) => {
        const sound = new Howl({
            src,
            html5: true
        })
        sound.play()
    }

    // ** функция отправки сообщения 
    const sendMessage = (value) => {
        addMessage(value, chatId, user.id, user.user_metadata.name ? user.user_metadata.name : user.user_metadata.username)
        callSound('/sendMessage.mp3')
    }


    // ** при изменении newOrUpdatedUser записыват данные о том печатает ли пользователь в state
    useEffect(() => {
        if (newOrUpdatedUser !== null && user !== null && user.id !== newOrUpdatedUser.id) {
            setTypingData({typing: newOrUpdatedUser.is_typing, name: newOrUpdatedUser.username || newOrUpdatedUser.username_google, chat: newOrUpdatedUser.typing_chat})
        }
    }, [newOrUpdatedUser])


    // ** при изменении адреса обновляет данные о пользователе
    useEffect(() => {
        if (user !== null) {
            updateUserTypingChat(user.id, router.query.id)
            updateUserTypingAnyway(user.id)
        }
        if (newOrUpdatedUser !== null && user !== null && user.id !== newOrUpdatedUser.id) {
            setTypingData({typing: newOrUpdatedUser.is_typing, name: newOrUpdatedUser.username || newOrUpdatedUser.username_google, chat: newOrUpdatedUser.typing_chat})
        }
    }, [router.query.id])

    
    // ** при монтировании обновляет и записывает данные TypingData
    useEffect(() => {
        if (newOrUpdatedUser !== null && user !== null && user.id !== newOrUpdatedUser.id) {
            updateUserTypingChat(user.id, router.query.id)
            updateUserTypingAnyway(user.id)
            setTypingData({typing: newOrUpdatedUser.is_typing, name: newOrUpdatedUser.username || newOrUpdatedUser.username_google, chat: newOrUpdatedUser.typing_chat})
        }
    }, []) 

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

    const update = () => {
        updateMessage()
    }

    const dropIn = {
        before: {
            y: '-100vh',
            opacity: 0,
        },
        in: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.1,
                type: 'spring',
                damping: 55,
                stiffness: 600,
            },
        },
        after: {
            y: '-100vh',
            opacity: 0,
            transition: {
                duration: 0.5,
            },
        },
    }

    return (
        <div id='chat' className='z-50 transition-all duration-[0.4s] w-full fixed xl:relative top-0 left-0 bottom-0 right-0 border-l-2 border-solid border-gray-200 dark:border-gray-800'>
            {router.query.type === 'p'
            && <PrivatChatHeader chatData={privatChatData}/>}

            {router.query.type === 'g'
            && <GroupChatHeader chatData={groupChatData}/>}
            
            <ChatWindow sendMessage={sendMessage} messages={messages} typingData={typingData}/>
        </div>
    )
}

