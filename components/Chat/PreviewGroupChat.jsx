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
            <div 
            onClick={() => setShowSetting(false)}
            className={`hover:bg-select bg-secondary transition flex items-center gap-3 w-full h-[85px]  p-2 cursor-pointer ${currentChat ? 'bg-select pointer-events-none' : ''}`}
        >
            <div className='flex items-center justify-center font-semibold text-2xl text-white w-14 h-14 grad-1 rounded-full'>
                {chatData && chatData.chat_title[0].toUpperCase()}
            </div>
            <div>
                <h4 className="text-xl text-primary font-semibold">
                    {chatData && chatData.chat_title}
                </h4>
                <div className='flex gap-2'>
                </div>
            </div>
        </div>
        </Link>
    )
}