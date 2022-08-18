// * react/next
import { useRef, useEffect} from 'react';

// * redux 
import {useSelector} from 'react-redux'

// * components
import OwnMessage from './OwnMessage';
import Message from './Message';

const RenderMessages = () => {
    const messagesEndRef = useRef(null)
    const {messages} = useSelector(state => state.chat)
    const {user} = useSelector(state => state.auth)

    const keys = Object.keys(messages);
    // ** при изменении(добавлении/удалении сообщения) messages скроллит страницу вниз
    useEffect(() => {
        if(messagesEndRef.current !== null) {
            messagesEndRef.current.scrollIntoView({
                block: 'start',
                behavior: 'smooth',
            })
        }
    }, [messages])

    return keys.map((key, index) => {
      const message = messages[key]
      const lastMessageKey = index === 0 ? null : keys[index - 1]

      return (
        <div key={index}>
            {
                user?.id === message.user_id 
                ? (
                    <OwnMessage messageData={message}/> 
                )
                : (
                    <Message 
                        messageData={message} 
                        lastMessage={messages[lastMessageKey]}
                    />
                )
            }
            <div ref={messagesEndRef}/> 
        </div>
      );
    });
};

export default RenderMessages