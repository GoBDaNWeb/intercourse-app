// * react/next
import { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// * redux 
import { useSelector} from 'react-redux'

// * supabase
import { updateUserTyping } from 'supabase/modules/user';

// * framer-motion
import { motion } from 'framer-motion';

// * icons
import {BsEmojiSmile} from 'react-icons/bs'

// * components
import { ThreeDots } from 'react-loader-spinner';
import SendButton from './SendButton';

const Picker = dynamic(() => {return import('emoji-picker-react')}, {ssr: false})

export default function ChatFooter({sendMessage, typingData}) {
    const [showPicker, setShowPicker] = useState(false)
    const [value, setValue] = useState('')

    const router = useRouter()

    const {user} = useSelector(state => state.auth)

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

    const sendMessageFunc = (e) => {
        if(e.code === 'Enter') {
            sendMessage(value)
            setValue('')
        }
    }

    const typingCondition = typingData !== null && typingData.chat === router.query.id && typingData.typing 

    return (
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
                typingCondition
                && (
                    <motion.div 
                        className='absolute flex items-center gap-2 justify-center -top-7 right-0 left-0 m-auto text-center w-full italic text-secondary' 
                    >
                        {typingData.name} is typing a message <ThreeDots color='#6B7280' height={12} width={25}/>
                    </motion.div>
                )
            }
            <div className='flex justify-center gap-2 items-center h-full w-full'>
                <div 
                    onClick={handlePicker}
                    className='text-3xl text-secondary dark:text-gray-900 cursor-pointer'
                >
                    <BsEmojiSmile/>
                </div>
                <input 
                    onBlur={() => updateUserTyping(user.id, true, false)}
                    onFocus={() => updateUserTyping(user.id, false, true)}
                    onKeyUp={sendMessageFunc}
                    onChange={onChange}
                    value={value}
                    className='w-[50%] px-2 border-2 border-solid text-primary bg-secondary border-gray-200 dark:border-gray-800 rounded-full h-full outline-none'
                    type="text"
                    placeholder='message' 
                />
                <SendButton
                    sendMessage={sendMessage}
                    setValue={setValue}
                    value={value}
                />
            </div>
        </div>
    )
}