// * react/next
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Link from "next/link";

// * redux
import { useSelector, useDispatch } from "react-redux";
import {clearNotification} from 'store/chatSlice'
import {closeSidebar} from 'store/sidebarSlice'

// * framer-motion
import { motion, AnimatePresence } from "framer-motion";

// * components
import GroupChatImage from 'components/shared/chat/GroupChatImage'

export default function PreviewGroupChat({chatData}) {
    const [currentNotification, setCurrentNotification] = useState([])

    const {notification} = useSelector(state => state.chat)

    const dispatch = useDispatch()

    const router = useRouter()

    const currentChat = (router.query.id === chatData.id);

    useEffect(() => {
        const notificationByCurrentChat = notification.filter(item => item.chat_id === chatId)
        setCurrentNotification(notificationByCurrentChat)
    }, [notification])
    
    return (
        <Link   
            href={{pathname: `/chats/[id]`, query: {type: 'g', id: `${chatData.id}`}}}
            locale="en"
        >
            <motion.div 
                onClick={() => {
                    dispatch(clearNotification(notification.filter(item => item.chat_id !== chatId)))
                    if (document.scrollingElement.clientWidth <= 600) {
                        dispatch(closeSidebar())
                    }
                }}
                className={`hover:bg-select bg-secondary transition flex items-center gap-3 w-full h-[72px]  p-2 cursor-pointer ${currentChat ? 'bg-select pointer-events-none' : ''}`}>
                <div className='relative flex items-center justify-center font-semibold text-2xl text-white w-14 h-14 grad-1 rounded-full'>
                    <GroupChatImage
                        chatData={chatData}
                        size={56}
                        text_size={'2xl'}
                    />
                    <AnimatePresence exitBeforeEnter>
                        {currentNotification.length > 0 &&
                            <motion.div 
                                className='w-6 h-6 bg-red-500 absolute -top-1 -right-1 rounded-full text-sm flex justify-center items-center border-2 border-solid border-gray-100 dark:border-gray-800'
                                initial={{scale: 0}}
                                animate={{scale: 1}}
                                exit={{scale: 0}}
                            >
                                {currentNotification.length}
                            </motion.div>
                        }
                    </AnimatePresence>
                </div>
                <div>
                    <div>
                        <h4 className="text-xl text-primary font-semibold">
                            {chatData && chatData.chat_title}
                        </h4>
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}