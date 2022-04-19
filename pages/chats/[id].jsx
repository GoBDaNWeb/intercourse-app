import { fetchOnePersonalChat, fetchOneGroupChat } from 'utils/Store';
import ChatWindow from '../../components/Chat/ChatWindow';
import { useRouter } from 'next/router';
import { useState, useContext } from 'react';
import { useEffect } from 'react';
import { addMessage, useStore } from '../../utils/Store';
import UserContext from '../../context/UserContext';
import {TiArrowBackOutline} from 'react-icons/ti'
import {BsThreeDots} from 'react-icons/bs'
import {motion, AnimatePresence} from 'framer-motion'
import ChatContext from './../../context/ChatContext';

export default function ChatsPage() {
    const [personalChatData, setPersonalChatData] = useState(null)
    const [groupChatData, setGroupChatData] = useState(null)
    
    const router = useRouter()
    const { id: chatId } = router.query
    const {user} = useContext(UserContext)
    const {showSetting, handleShowSetting} = useContext(ChatContext)
    const {messages} = useStore({chatId})

    // ** функция отправки сообщения 
    const sendMessage = (value) => {
        addMessage(value, chatId, user.id)
    } 

    // ** при изменении маршрута в зависимости от типа чата записывает соответствующие данные 
    useEffect(() => {
        if (router.query.type === 'p') {
            const data = fetchOnePersonalChat(router.query.id)
            data.then(chat => setPersonalChatData(chat))
            console.log(personalChatData)
        }
        if (router.query.type === 'g') {
            const data = fetchOneGroupChat(router.query.id)
            data.then(chat => setGroupChatData(chat))
            console.log(groupChatData)
        }
    }, [router.query.id])

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
                damping: 45,
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
            && <PersonalChat chatData={personalChatData} router={router} user={user}/>}

            {router.query.type === 'g'
            && <GroupChat chatData={groupChatData} router={router} user={user} showSetting={showSetting} handleShowSetting={handleShowSetting} dropIn={dropIn}/>}
            
            <ChatWindow sendMessage={sendMessage} messages={messages}/>
        </div>
    )
}

const PersonalChat = ({chatData, user, router}) => (
    <div className='z-50 absolute top-0 left-0 right-0 w-[50%] rounded-b-[20px] flex justify-center h-14 bg-[#2C4A52] shadow-custom m-auto'>
        <motion.div 
            onClick={() => router.push('/home')}
            className='absolute flex justify-center items-center text-xl -left-3 -bottom-3 bg-[#2C4A52] w-10 h-10 rounded-full border-solid border-2 border-[#F4EBDB] text-white cursor-pointer'
            whileHover={{
                scale: 1.05
            }}
        >
            <TiArrowBackOutline/>
        </motion.div>
        {
            chatData !== null 
            ?   <div className='flex flex-col items-center'>
                    <div className='text-white font-semibold text-2xl'>
                        {chatData && chatData.chat_title}
                    </div>
                    <h5 className='text-gray-200 text-sm flex items-center gap-2 px-8'>
                        this is personal chat with
                        {user && chatData && user.id === chatData.created_by.id
                            ? (<h4 className='text-white font-semibold text-lg'>{chatData.interlocutor.username || chatData.interlocutor.username_google}</h4>)
                            : (<h4 className='text-white font-semibold text-lg'>{chatData.created_by.user_metadata.username}</h4>)}
                    </h5>
                </div>
            : ''
        }
    </div>
)

const GroupChat = ({chatData, router, showSetting, handleShowSetting, dropIn}) => (
    <div>
        <div className='z-50 absolute top-0 left-0 right-0 w-[50%] rounded-b-[20px] flex justify-center h-14 bg-[#2C4A52] shadow-custom m-auto'>
            <motion.div 
                onClick={() => {
                    router.push('/home')
                    handleShowSetting(false)
                }}
                className='absolute flex justify-center items-center text-xl -left-3 -bottom-3 bg-[#2C4A52] w-10 h-10 rounded-full border-solid border-2 border-[#F4EBDB] text-white cursor-pointer'
                whileHover={{
                    scale: 1.05
                }}
            >
                <TiArrowBackOutline/>
            </motion.div>
            <motion.div 
            onClick={() => handleShowSetting()}
                className='absolute flex justify-center items-center text-xl -right-3 -bottom-3 bg-[#2C4A52] w-10 h-10 rounded-full border-solid border-2 border-[#F4EBDB] text-white cursor-pointer'
                whileHover={{
                    scale: 1.05
                }}
            >
                <BsThreeDots/>
            </motion.div>
            {
                chatData !== null 
                ?   <div className='flex flex-col items-center justify-center w-full'>
                        <div className='text-white font-semibold text-2xl'>
                            {chatData && chatData.chat_title}
                        </div>
                    </div>
                : ''
            }
        </div>
        <AnimatePresence>
            {
                chatData !== null  && showSetting
                && <motion.div 
                        className='absolute bg-[#537072] w-[50%] h-96 z-10 m-auto top-0 left-0 right-0 rounded-b-[20px] shadow-custom'
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
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    </div>
    
)