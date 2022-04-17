import OwnMessage from 'components/Chat/OwnMessage';
import Message from 'components/Chat/Message';
import {RiSendPlaneLine} from 'react-icons/ri'
import {BsEmojiSmile} from 'react-icons/bs'
import { useState, useContext, useEffect, useRef } from 'react';
import Picker from 'emoji-picker-react';
import { motion } from 'framer-motion';
import { addMessage, useStore } from './../../utils/Store';
import { useRouter } from 'next/router';
import UserContext from './../../context/UserContext';
import Image from 'next/image';

export default function ChatWindow({sendMessage, messages}) {
    const [showPicker, setShowPicker] = useState(false)
    const [value, setValue] = useState('')
    const router = useRouter()
    const {user} = useContext(UserContext)
    const messagesEndRef = useRef(null)
   
    // ** при изменении(добавлении/удалении сообщения) messages скроллит страницу вниз
    useEffect(() => {
        messagesEndRef.current.scrollIntoView({
            block: 'start',
            behavior: 'smooth',
          })
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

    return (
        <div className="h-screen flex flex-col justify-end items-center pb-14">
            <div className='px-40 flex flex-col justify-end gap-3 w-full h-full overflow-auto pb-2'>
                {messages.map((message) => (
                    user.id === message.user_id ?
                    <OwnMessage key={message.id} message={message}/>
                    : <Message  key={message.id} message={message}/>
                ))}
                <div ref={messagesEndRef}/>
            </div>
            <div className='flex items-center justify-between w-[595px] bg-white h-12 rounded-full gap-2 p-2 mt-6 shadow-custom relative'>
                {
                    showPicker
                    && (<div className='absolute bottom-[55px]'>
                        <Picker onEmojiClick={onEmojiClick} pickerStyle={{
                            width: '20rem',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                        }}/>
                    </div>)
                }
                <div 
                    onClick={handlePicker}
                    className='text-3xl text-gray-600 cursor-pointer'
                >
                    <BsEmojiSmile/>
                </div>
                <input 
                    onKeyUp={(e) => {
                        if(e.code === 'Enter') {
                            sendMessage(value)
                            setValue('')
                        }
                    }}
                    onChange={e => onChange(e)}
                    value={value}
                    className='w-full outline-none'
                    type="text"
                    placeholder='message' 
                />
                <div 
                    onClick={(e) => {
                        sendMessage(value)
                        setValue('')
                    }}
                    className='flex items-center justify-center rounded-full text-2xl bg-gray-800 w-12 h-10'
                >
                     <Image
                        src='/Logo.svg'
                        alt="Logo" 
                        width={30} 
                        height={30} 
                    />
                </div>
            </div>
        </div>
    )
}