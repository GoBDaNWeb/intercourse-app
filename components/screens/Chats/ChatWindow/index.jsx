// * react/next
import { useEffect, useRef } from 'react';

// * icons
import {RiWechatLine} from 'react-icons/ri'
import {useSelector} from 'react-redux'

// * components
import OwnMessage from './OwnMessage';
import Message from './Message';
import ChatFooter from './ChatFooter/index';

export default function ChatWindow({sendMessage, messages, typingData}) {
    
    const messagesEndRef = useRef(null)

    const {user} = useSelector(state => state.auth)
    const {bgChat} = useSelector(state => state.chat)
   
    // ** при изменении(добавлении/удалении сообщения) messages скроллит страницу вниз
    useEffect(() => {
        if(messagesEndRef.current !== null) {
            messagesEndRef.current.scrollIntoView({
                block: 'start',
                behavior: 'smooth',
              })
        }
    }, [messages])

    // ** рендерит сообщения в окне диалога
    const renderMessages = () => {
        const keys = Object.keys(messages);
    
        return keys.map((key, index) => {
          const message = messages[key]
          const lastMessageKey = index === 0 ? null : keys[index - 1]
          return (
            <div key={index}>
                {
                    user !== null && user.id === message.user_id ?
                    <OwnMessage message={message}/> 
                    : <Message message={message} lastMessage={messages[lastMessageKey]}/>
                }
                <div ref={messagesEndRef}/> 
            </div>
          );
        });
    };

    return (
        <div className={`transition-all duration-[0.4s] h-screen w-full flex flex-col justify-end items-center bg-chat-${bgChat}`}>
            {
                messages.length
                && <div className='pl-20 pr-10 flex flex-col gap-2 w-full h-full overflow-auto custom-scroll pb-2 mt-14 pt-2'>
                    {renderMessages()}
                </div> 
            }
            {
                !messages.length
                && <div className='flex justify-center items-center gap-3 w-full h-full'>
                    <div className='flex flex-col gap-4 justify-center items-center w-96 h-96 bg-black rounded-[20px] shadow-custom bg-opacity-40'>
                        <h3 className='text-white text-3xl font-semibold text-center'>
                            why is the chat still empty?
                        </h3>
                        <RiWechatLine className='text-white text-8xl'/>
                    </div>
                </div>
            }
            <ChatFooter
                sendMessage={sendMessage}
                typingData={typingData}
            />
        </div>
    )
}