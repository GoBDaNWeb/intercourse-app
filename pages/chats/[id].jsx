import { fetchMessages, fetchOnePersonalChat, fetchOneGroupChat } from 'utils/Store';
import { supabase } from 'utils/supabaseClient';
import ChatWindow from 'components/Chat/ChatWindow';
import { useRouter } from 'next/router';
import { useState, useContext } from 'react';
import { useEffect } from 'react';
import { addMessage, updateMessage, updateUserTypingAnyway, updateUserTypingChat  } from 'utils/Store';
import {TiArrowBackOutline} from 'react-icons/ti'
import {BsThreeDots} from 'react-icons/bs'
import {motion, } from 'framer-motion'
import {useSelector} from 'react-redux'

export default function ChatsPage() {
    const [personalChatData, setPersonalChatData] = useState(null)
    const [groupChatData, setGroupChatData] = useState(null)
    const [typingData, setTypingData] = useState(null)
    
    const router = useRouter()
    const { id: chatId } = router.query
    const {user} = useSelector(state => state.auth)

    const useStore = (props) => {
        const [messages, setMessages] = useState([])
        const [users] = useState(new Map())
        const [newMessage, handleNewMessage] = useState(null)
        const [newOrUpdatedUser, handleNewOrUpdatedUser] = useState(null)
        useEffect(() => {
            const userListener = supabase
                .from('users')
                .on('*', payload => {
                    // console.log(payload)
                    handleNewOrUpdatedUser(payload.new)
                })
                .subscribe()
    
    
            const messageListener = supabase
                .from('messages')
                .on('INSERT', payload => {
                    // console.log(payload.new);
                    handleNewMessage(payload.new)
                })
                .on('UPDATE', payload => {console.log(payload)})
                .on('DELETE', payload => {handleNewMessage(payload.old)})
                .subscribe()
    
            return () => {
                userListener.unsubscribe()
                messageListener.unsubscribe()
            }
        }, [])
    
        // **  следит за изменениями маршрута 
        useEffect(() => {
            if  (props.chatId) {
                fetchMessages(props.chatId, (messages) => {
                    messages.forEach((x) => {
                        users.set(x.user_id, x.author)
                    })
                    setMessages(messages)
                })
            }
        }, [props.chatId])
    
        useEffect(() => {
            if(newMessage && newMessage.chat_id === props.chatId) {
                setMessages(messages.concat(newMessage))
            }
        }, [newMessage])
    
        useEffect(() => {
            if (newOrUpdatedUser) users.set(newOrUpdatedUser.id, newOrUpdatedUser)
          }, [newOrUpdatedUser])
    
        return {newOrUpdatedUser, messages}
    }

    const {messages, newOrUpdatedUser} = useStore({chatId})

    // ** функция отправки сообщения 
    const sendMessage = (value) => {
        addMessage(value, chatId, user.id, user.user_metadata.name ? user.user_metadata.name : user.user_metadata.username)
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
            const data = fetchOnePersonalChat(router.query.id)
            data.then(chat => setPersonalChatData(chat))
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
                duration: 0.2,
                type: 'spring',
                damping: 35,
                stiffness: 400,
            },
        },
        after: {
            y: '-100vh',
            opacity: 0,
        },
    }

    return (
        <div className='w-full relative'>
            {router.query.type === 'p'
            && <PersonalChat chatData={personalChatData} router={router} user={user} update={update} />}

            {router.query.type === 'g'
            && <GroupChat chatData={groupChatData} router={router} user={user} dropIn={dropIn} />}
            
            <ChatWindow sendMessage={sendMessage} messages={messages} typingData={typingData}/>
        </div>
    )
}

const PersonalChat = ({chatData, user, router, update}) => (
    <div className='z-50 absolute top-0 left-0 right-0 w-full flex justify-center h-14 bg-secondary border-b-2 border-solid border-gray-200 dark:border-gray-800 m-auto'>
        <motion.div
            onClick={() => router.push('/home')}
            className='absolute left-2 top-4 text-2xl text-secondary cursor-pointer'
            whileHover={{
                scale: 1.05
            }}
        >
            <TiArrowBackOutline/>
        </motion.div>
        {
            chatData
            ?   <div className='flex flex-col items-center'>
                    <div className='text-primary font-semibold text-2xl'>
                        {chatData && chatData.chat_title} 
                    </div>
                    <div className='text-secondary text-sm flex items-center gap-2 px-8'>
                        this is personal chat with
                        {user && chatData && user.id === chatData.created_by.id
                            ? (<h4 className='text-primary font-semibold text-lg'>{chatData.interlocutor.username || chatData.interlocutor.username_google}</h4>)
                            : (<h4 className='text-primary font-semibold text-lg'>{chatData.created_by.user_metadata.username}</h4>)}
                    </div>
                </div>
            : ''
        }
    </div>
)

const GroupChat = ({chatData, router, dropIn}) => (
    <div>
        <div className='z-50 absolute top-0 left-0 right-0 w-full flex justify-center h-14 bg-secondary border-b-2 border-solid border-gray-200 dark:border-gray-800 m-auto'>
            <motion.div
                onClick={() => router.push('/home')}
                className='absolute left-2 top-4 text-2xl text-secondary cursor-pointer'
                whileHover={{
                    scale: 1.05
                }}
            >
                <TiArrowBackOutline/>
            </motion.div>
            {
                chatData !== null 
                ?   <div className='flex flex-col items-center justify-center w-full'>
                        <div className='text-primary font-semibold text-2xl'>
                            {chatData && chatData.chat_title}
                        </div>
                    </div>
                : ''
            }
        </div>
        {/* <AnimatePresence>
            {
                chatData !== null 
                && <motion.div 
                        className='absolute bg-[#fafafa] w-full h-96 z-10 m-auto top-0 left-0 right-0 rounded-b-[20px] shadow-custom'
                        variants={dropIn}
                    initial='before'
                    animate='in'
                    exit='after'

                    >
                    <div className='pt-20 px-2'>
                        <h3 className='flex justify-center items-center text-white gap-1'>
                            Chat created by 
                            <span className='font-semibold text-xl'>
                                {
                                    chatData.created_by.user_metadata.username || chatData.created_by.user_metadata.username_google
                                }
                            </span>
                        </h3>
                        <div className='text-white'>
                            <h3>Members:</h3>
                            <ul>
                                {
                                    chatData.members.map(member => (
                                        <li key={member.id} className='text-xl font-semibold'>
                                            {member.username || member.username_google}
                                            <span className='text-sm text-gray-300 ml-4'>{member.status}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </motion.div>
            }
        </AnimatePresence> */}
    </div>
    
)