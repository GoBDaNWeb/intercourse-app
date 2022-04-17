import { useState, useEffect,useContext } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from 'next/router';
import UserContext from './../../context/UserContext';
import { useStore, fetchMessages } from './../../utils/Store';
import { Login } from 'components/Login/Register/Login';

export default function PreviewChat({chatData}) {
    const [lastMessage, setlastMessage] = useState('')

    const router = useRouter()
    const {user} = useContext(UserContext)
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
            <motion.div 
                className={`flex items-center gap-3 w-full h-[85px] bg-[#2C4A52] p-2 cursor-pointer rounded-[20px] shadow-custom ${currentChat ? 'bg-[#2C3D52] pointer-events-none' : ''}`}
                whileHover={{
                    x: 8
                }}
            >
                <div className='flex items-center justify-center font-semibold text-2xl text-white w-14 h-14 bg-[#407786] rounded-full'>
                    {chatData && chatData.chat_title[0]}
                </div>
                <div>
                    <div>
                        <h4 className="text-xl text-white font-semibold">
                            {chatData && chatData.chat_title}
                        </h4>
                        <div className="text-gray-200 italic text-sm flex items-center gap-2">
                            chat with {user && chatData && user.id === chatData.created_by.id
                            ? (<h4 className='text-white font-semibold text-lg'>{chatData.interlocutor.username}</h4>)
                            : (<h4 className='text-white font-semibold text-lg'>{chatData.created_by.user_metadata.username}</h4>)}
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        {lastMessage.user_id === user.id 
                        ? (
                            <div className='flex gap-2'>
                                <h5 className="text-gray-200 font-medium">You:</h5>
                                <p className="whitespace-nowrap font-light text-gray-300 ">
                                    {lastMessage.message}
                                </p>
                            </div>)
                        : (<p className="whitespace-nowrap font-light text-gray-300 ">
                        {lastMessage.message}
                    </p>)
                        }
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}