import OwnMessage from 'components/Chat/OwnMessage';
import Message from 'components/Chat/Message';
import {RiSendPlaneLine} from 'react-icons/ri'
import {BsEmojiSmile} from 'react-icons/bs'
import { useState, useContext, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { updateUserTyping, updateMessage } from 'utils/Store';
import { useRouter } from 'next/router';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import {RiWechatLine} from 'react-icons/ri'
import {useSelector} from 'react-redux'
import { ThreeDots } from 'react-loader-spinner';
import { ImAttachment } from 'react-icons/im';

const Picker = dynamic(() => {return import('emoji-picker-react')}, {ssr: false})

export default function ChatWindow({sendMessage, messages, typingData, chatData}) {
    const [showPicker, setShowPicker] = useState(false)
    const [value, setValue] = useState('')
    const [messageArr, setMessageArr] = useState([])

    const router = useRouter()
    const messagesEndRef = useRef(null)

    const {user} = useSelector(state => state.auth)
    const {bgChat} = useSelector(state => state.chat)
    const {theme} = useSelector(state => state.theme)
   
    // ** при изменении(добавлении/удалении сообщения) messages скроллит страницу вниз
    useEffect(() => {
        if(messagesEndRef.current !== null) {
            messagesEndRef.current.scrollIntoView({
                block: 'start',
                behavior: 'smooth',
              })
        }
    }, [messages])

    // ** следит за иземениями в value
    const onChange = (e) => {
        const {value} = e.target 
        setValue(value)
    }

    // ** функция добавляет выбранный emoji в value 
    const onEmojiClick = (event, emojiObject) => {
        setValue(value + emojiObject.emoji)
    }

    // ** функция монтирует/размонтирует элемент emojiPicker
    const handlePicker = () => {
        setShowPicker(showPicker = !showPicker)
    }

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
        <div className={`h-screen flex flex-col justify-end items-center bg-chat-${bgChat}`}>
            {
                messages.length
                && <div className='pl-20 pr-10 flex flex-col gap-2 w-full h-full overflow-auto pb-2 mt-14 pt-2'>
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
            <div className=' w-full bg-secondary h-16 border-t-2 border-solid border-gray-200 dark:border-gray-800 p-2 relative'>
                {
                    showPicker
                    && (<div className='absolute bottom-[60px] left-[270px]'>
                        <Picker onEmojiClick={onEmojiClick} pickerStyle={{
                            width: '20rem',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                        }}/>
                    </div>)
                }
                {
                    typingData !== null 
                    && typingData.chat === router.query.id 
                    && typingData.typing && <motion.div 
                        className='absolute flex items-center gap-2 justify-center -top-7 right-0 left-0 m-auto text-center w-full italic text-secondary' 
                    >
                        {typingData.name} is typing a message <ThreeDots color='#6B7280' height={12} width={25}/>
                    </motion.div>
                }
                <div className='flex justify-center gap-2 items-center h-full w-full'>
                    {/* <div 
                        onClick={handlePicker}
                        className='text-3xl text-secondary dark:text-gray-900 cursor-pointer'
                    >
                        <ImAttachment/>
                    </div> */}
                    <div 
                        onClick={handlePicker}
                        className='text-3xl text-secondary dark:text-gray-900 cursor-pointer'
                    >
                        <BsEmojiSmile/>
                    </div>
                    <input 
                        onBlur={() => {
                            updateUserTyping(user.id, true, false)
                        }}
                        onFocus={() => {
                            updateUserTyping(user.id, false, true)
                        }}
                        onKeyUp={(e) => {
                            if(e.code === 'Enter') {
                                sendMessage(value)
                                setValue('')
                            }
                        }}
                        onChange={e => onChange(e)}
                        value={value}
                        className='w-[50%] px-2 border-2 border-solid text-primary bg-secondary border-gray-200 dark:border-gray-800 rounded-full h-full outline-none'
                        type="text"
                        placeholder='message' 
                    />
                    <div className='flex items-center justify-center rounded-full text-2xl bg-accent w-10 h-10'>
                        <AnimatePresence exitBeforeEnter initial={true}>
                        {
                        !value.length
                        &&   <motion.div
                                initial={{scale: 0}}
                                animate={{scale: 1}}
                                exit={{scale: 0}}
                                className='absolute'
                            >
                                <div className='pt-3'>
                                    {
                                        theme === 'dark' ?
                                        <Image
                                            src='/carbon_chat-bot.svg'
                                            alt="Logo" 
                                            width={30} 
                                            height={30} 
                                        />
                                        :
                                        <Image
                                            src='/Logo.svg'
                                            alt="Logo" 
                                            width={30} 
                                            height={30} 
                                        />
                                    }
                                </div>
                            </motion.div>
 
                    }
                        </AnimatePresence>
                        <AnimatePresence exitBeforeEnter initial={true}>
                            {value.length
                        && 
                                <motion.div 
                                    onClick={(e) => {
                                        sendMessage(value)
                                        setValue('')
                                    }}
                                    className='absolute'
                                    initial={{scale: 0}}
                                    animate={{scale: 1}}
                                    exit={{scale: 0}}
                                >
                                    <RiSendPlaneLine className='text-accent'/>
                                </motion.div>
                            }
                        </AnimatePresence>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}