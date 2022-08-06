// * react/next
import { memo } from "react";
import Link from "next/link";

// * hooks 
import {usePreviewPrivatChat} from './usePreviewPrivatChat'

// * framer-motion
import { motion, AnimatePresence } from "framer-motion";

// * components 
import PrivatChatImage from './PrivatChatImage'

export default memo(function PreviewPrivatChat({chatData}) {
    const {
        models: {
            user,
            currentNotification,
            currentChat
        },
        commands: {
            openChat
        }
    } = usePreviewPrivatChat(chatData)

    return (
        <Link   
            href={{pathname: `/chats/[id]`, query: {type: 'p', id: `${chatData.id}`}}}
            locale="en"
        >
            <div 
                onClick={(chatId) => openChat(chatId)}
                className={`hover:bg-select bg-secondary transition flex items-center gap-3 w-full h-[72px]  p-2 cursor-pointer ${currentChat ? 'bg-select pointer-events-none' : ''}`}
            >
                <div className='relative flex items-center justify-center font-semibold text-2xl text-white w-14 h-14 grad-1 rounded-full'>
                    <PrivatChatImage
                        chatData={chatData}
                        size={56}
                        text_size={'2xl'}
                    />
                    <AnimatePresence exitBeforeEnter>
                        {
                            currentNotification.length > 0 
                            && (
                                <motion.div 
                                    className='w-6 h-6 bg-red-500 absolute -top-1 -right-1 rounded-full text-sm flex justify-center items-center border-2 border-solid border-gray-100 dark:border-gray-800'
                                    initial={{scale: 0}}
                                    animate={{scale: 1}}
                                    exit={{scale: 0}}
                                >
                                    {currentNotification.length}
                                </motion.div>
                            )
                        }
                    </AnimatePresence>
                </div>
                <div>
                    <div>
                        <h4 className="text-xl text-primary font-semibold">
                            {chatData?.chat_title}
                        </h4>
                        <div className="text-secondary italic text-sm flex items-center gap-2">
                            chat with 
                            {
                                user?.id === chatData?.created_by.id
                                ? (
                                    <h4 className='text-primary font-semibold text-lg'>
                                        {chatData.interlocutor.username || chatData.interlocutor.username_google}
                                    </h4>
                                    )
                                : (
                                    <h4 className='text-primary font-semibold text-lg'>
                                        {chatData.created_by.user_metadata.username || chatData.created_by.user_metadata.name}
                                    </h4>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
})