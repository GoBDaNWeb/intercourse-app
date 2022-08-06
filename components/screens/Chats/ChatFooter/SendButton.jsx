// * react/next
import {memo} from 'react'
import Image from 'next/image';

// * hooks 
import {useChatFooter} from './useChatFooter'

// * framer-motion
import { motion, AnimatePresence } from 'framer-motion';

// * icons
import {RiSendPlaneLine} from 'react-icons/ri'

export default memo(function SendButton() {
    const {
        models: {
            theme,
            value,
        },
        commands: {
            sendMessageMouse,
        }
    } = useChatFooter()

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
                            onClick={sendMessageMouse}
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
})