import { useState, useEffect,useContext } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useStore, fetchMessages } from './../../utils/Store';
import { Login } from 'components/auth/Login';
import { useSelector } from "react-redux";

export default function PreviewChat({chatData}) {
    const [lastMessage, setlastMessage] = useState('')

    const router = useRouter()
    const {user} = useSelector(state => state.auth)
    const currentChat = (router.query.id === chatData.id);  
    
    const chatId = chatData.id


    // const limitStr = (str) => {
    //     setMessage(str.substr(0, 28).trim() + '...')
    // }

    // useEffect(() => {
    //     limitStr(lastMessage.message)
    // }, [])


    return (
        <Link   
            href={{pathname: `/chats/[id]`, query: {type: 'p', id: `${chatData.id}`}}}
        >
            <motion.div className={`hover:bg-select bg-secondary transition flex items-center gap-3 w-full h-[85px]  p-2 cursor-pointer ${currentChat ? 'bg-select pointer-events-none' : ''}`}>
                <div className='flex items-center justify-center font-semibold text-2xl text-white w-14 h-14 grad-1 rounded-full'>
                    {chatData && chatData.chat_title[0].toUpperCase()}
                </div>
                <div>
                    <div>
                        <h4 className="text-xl text-primary font-semibold">
                            {chatData && chatData.chat_title}
                        </h4>
                        <div className="text-secondary italic text-sm flex items-center gap-2">
                            chat with {user && chatData && user.id === chatData.created_by.id
                            ? (<h4 className='text-primary font-semibold text-lg'>{chatData.interlocutor.username || chatData.interlocutor.username_google}</h4>)
                            : (<h4 className='text-primary font-semibold text-lg'>{chatData.created_by.user_metadata.username || chatData.created_by.user_metadata.name}</h4>)}
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        {user && lastMessage.user_id === user.id 
                        ? (
                            <div className='flex gap-2'>
                                <h5 className="text-gray-400 font-medium">You:</h5>
                                <p className="whitespace-nowrap font-light text-gray-300 ">
                                    {lastMessage.message}   
                                </p>    
                            </div>) 
                        : (<p className="whitespace-nowrap font-light   text-gray-300 ">
                        {lastMessage.message}   
                    </p>)   
                        }
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}