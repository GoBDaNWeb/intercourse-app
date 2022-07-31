// * react/next
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// * supabase
import { updateUserTyping } from 'utils/Store';

// * framer-motion
import { motion, AnimatePresence } from 'framer-motion';

// * icons
import {RiSendPlaneLine} from 'react-icons/ri'
import {BsEmojiSmile} from 'react-icons/bs'
import {RiWechatLine} from 'react-icons/ri'
import {useSelector} from 'react-redux'

// * components
import { ThreeDots } from 'react-loader-spinner';
import OwnMessage from 'components/shared/chat/OwnMessage';
import Message from 'components/shared/chat/Message';

export default function SendButton({setValue, sendMessage, value}) {
    const {theme} = useSelector(state => state.theme)
    const {user} = useSelector(state => state.auth)

    const sendMessageFunc = () => {
        sendMessage(value)
        setValue('')
    }

    return (
        <div className='flex items-center justify-center rounded-full text-2xl bg-accent w-10 h-10'>
            <AnimatePresence exitBeforeEnter initial={true}>
            {
                !value.length
                &&  <motion.div
                        initial={{scale: 0}}
                        animate={{scale: 1}}
                        exit={{scale: 0}}
                        className='absolute'
                    >
                        <div className='pt-3'>
                            {
                                theme === 'dark' 
                                ? (
                                    <Image
                                        src='/carbon_chat-bot.svg'
                                        alt="Logo" 
                                        width={30} 
                                        height={30} 
                                    />
                                ) : (
                                    <Image
                                        src='/Logo.svg'
                                        alt="Logo" 
                                        width={30} 
                                        height={30} 
                                    />
                                )
                            }
                        </div>
                    </motion.div>
            }
            </AnimatePresence>
            <AnimatePresence exitBeforeEnter initial={true}>
                {
                    value.length
                    && (
                        <motion.div 
                            onClick={sendMessageFunc}
                            className='absolute'
                            initial={{scale: 0}}
                            animate={{scale: 1}}
                            exit={{scale: 0}}
                        >
                            <RiSendPlaneLine className='text-accent'/>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </div>
    )
}