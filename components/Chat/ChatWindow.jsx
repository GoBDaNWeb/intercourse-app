import OwnMessage from 'components/Chat/OwnMessage';
import Message from 'components/Chat/Message';
import {RiSendPlaneLine} from 'react-icons/ri'
import {BsEmojiSmile} from 'react-icons/bs'
import { useState, useContext, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { addMessage, useStore } from './../../utils/Store';
import { useRouter } from 'next/router';
import UserContext from './../../context/UserContext';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import {RiWechatLine} from 'react-icons/ri'

const Picker = dynamic(() => {return import('emoji-picker-react')}, {ssr: false})

export default function ChatWindow({sendMessage, messages}) {
    const [showPicker, setShowPicker] = useState(false)
    const [value, setValue] = useState('')
    const router = useRouter()
    const {user} = useContext(UserContext)
    const messagesEndRef = useRef(null)
   
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

    console.log(messages)

    return (
        <div className="h-screen flex flex-col justify-end items-center pb-14">
            {
                messages.length
                &&  <div className='px-20 flex flex-col gap-3 w-full h-full overflow-auto pb-2 mt-14'>
                    {messages.map((message) => (
                        user.id === message.user_id ?
                        <OwnMessage key={message.id} message={message}/>
                        : <Message  key={message.id} message={message}/>
                    ))}
                    <div ref={messagesEndRef}/>
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
            <div className='flex items-center justify-between w-[50%] bg-white h-12 rounded-full gap-2 p-2 shadow-custom relative mt-1'>
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
                {
                    !value.length
                    ?   <div 
                            className='flex items-center justify-center rounded-full text-2xl bg-[#2C4A52] w-12 h-10'
                        >
                            <div className='pt-3 '>
                                <Image
                                    src='/Logo.svg'
                                    alt="Logo" 
                                    width={30} 
                                    height={30} 
                                />
                            </div>
                        </div>
                    :   <motion.div 
                            onClick={(e) => {
                                sendMessage(value)
                                setValue('')
                            }}
                            className='flex items-center justify-center rounded-full text-2xl bg-[#2C4A52] w-12 h-10 hover:cursor-pointer'
                            whileHover={{
                                scale: 1.05
                            }}
                        >
                            <RiSendPlaneLine className='text-white'/>
                        </motion.div>
                }
            </div>
        </div>
    )
}