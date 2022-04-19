import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from 'next/router';
import ChatContext from './../../context/ChatContext';

export default function PreviewGroupChat({chatData}) {
    const [message, setMessage] = useState('')
    const router = useRouter()
    const {setShowSetting} = useContext(ChatContext)

    const currentChat = (router.query.id === chatData.id);

    
    
    return (
        <Link
            href={{pathname: `/chats/[id]`, query: {type: 'g', id: `${chatData.id}`}}}
        >
            <motion.div 
            onClick={() => setShowSetting(false)}
            className={`flex items-center gap-3 w-full h-[85px] bg-[#2C4A52] p-2 cursor-pointer rounded-[20px] shadow-custom ${currentChat ? 'bg-[#2C3D52] pointer-events-none' : ''}`}
            whileHover={{
                x: 8
            }}
        >
            <div className='flex items-center justify-center font-semibold text-2xl text-white w-14 h-14 bg-[#407786] rounded-full'>
                {chatData && chatData.chat_title[0].toUpperCase()}
            </div>
            <div>
                <h4 className="text-xl text-white font-semibold">
                    {chatData && chatData.chat_title}
                </h4>
                <div className='flex gap-2'>
                </div>
            </div>
        </motion.div>
        </Link>
    )
}