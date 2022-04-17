import { fetchOnePersonalChat, fetchOneGroupChat } from 'utils/Store';
import ChatWindow from '../../components/Chat/ChatWindow';
import { useRouter } from 'next/router';
import { useState, useContext } from 'react';
import { useEffect } from 'react';
import { addMessage, useStore } from '../../utils/Store';
import UserContext from '../../context/UserContext';

export default function ChatsPage() {
    const [personalChatData, setPersonalChatData] = useState(null)
    const [groupChatData, setGroupChatData] = useState(null)
    const router = useRouter()
    const { id: chatId } = router.query
    const {user} = useContext(UserContext)
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
        }
        if (router.query.type === 'g') {
            const data = fetchOneGroupChat(router.query.id)
            data.then(chat => setGroupChatData(chat))
        }
    }, [router.query.id])

    return (
        <div className='w-full relative'>
            {router.query.type === 'p'
            && <PersonalChat chatData={personalChatData}/>}

            {router.query.type === 'g'
            && <GroupChat chatData={groupChatData}/>}
            
            <ChatWindow sendMessage={sendMessage} messages={messages}/>
        </div>
    )
}

const PersonalChat = ({chatData, user}) => (
    <div className='absolute top-0 left-0 right-0 w-[50%] rounded-b-[20px] flex justify-center h-14 bg-[#2C4A52] shadow-custom m-auto'>
        {
            chatData !== null 
            ?   <div className='flex flex-col items-center'>
                    <div className='text-white font-semibold text-2xl'>
                        {chatData && chatData.chat_title}
                    </div>
                    <h5 className='text-gray-200 text-sm flex items-center gap-2'>
                        this is personal chat with 
                        {
                            user && chatData && user.id === chatData.created_by.id
                            ? (<h4 className='text-white font-semibold text-lg'>{chatData.interlocutor.username}</h4>)
                            : (<h4 className='text-white font-semibold text-lg'>{chatData.created_by.user_metadata.username}</h4>)
                        }
                    </h5>
                </div>
            : ''
        }
    </div>
)

const GroupChat = ({chatData}) => (
    <div className='absolute top-0 left-0 right-0 w-[50%] rounded-b-[20px] flex justify-center h-14 bg-[#2C4A52] shadow-custom m-auto'>
        {
            chatData !== null 
            ?   <div className='flex flex-col items-center'>
                    <div className='text-white font-semibold text-2xl'>
                        {chatData && chatData.chat_title}
                    </div>
                    <h5 className='text-gray-200 text-sm flex gap-2'>
                        this is group chat with <div className='flex gap-1 italic'>
                            {chatData.members.map((member) => (
                                <div key={member.id}>{member.username}</div>
                            ))}
                        </div>
                    </h5>
                </div>
            : ''
        }
    </div>
)