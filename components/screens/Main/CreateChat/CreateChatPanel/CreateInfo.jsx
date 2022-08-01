// * react/next
import {memo} from 'react'
import { useRouter } from 'next/router';

// * redux
import {useSelector} from 'react-redux'

// * supabase
import { addPrivatChat, addGroupChat} from 'utils/Store';

// * framer-motion
import {motion} from 'framer-motion'

export default memo(function CreateInfo({selectedUsers, chatTitle, setChatTitle}) {

    const {user} = useSelector(state => state.auth)

    const router = useRouter()
    // ** функция создания нового группового/приватного чата
    const newChat = () => {
        const randomId = len => Math.random().toString(36).substr(3, len);
        const id = randomId(15);
        if (selectedUsers.length === 1) {
            addPrivatChat(id, user, selectedUsers[0], chatTitle)
            router.push({pathname:'chats/[id]', query: {type: 'p', id: `${id}`}})
        }
        if (selectedUsers.length > 1) {
            addGroupChat(id, user, selectedUsers, chatTitle)
            router.push({pathname:'chats/[id]', query: {type: 'g', id: `${id}`}})
        }
    }
    
    return (
        <div className='flex flex-col gap-1 items-center justify-center'>
            <div className='h-8'>
                {
                    selectedUsers?.length ?
                    <h6 className='text-secondary text-sm'>
                        you create 
                            <span className='italic font-bold'>
                                {selectedUsers?.length > 1 ? 'group' : 'privat'}
                            </span>  
                        chat
                    </h6>
                    : ''
                }
            </div>
            <motion.button 
                disabled={!chatTitle?.length || !selectedUsers?.length}
                onClick={() => {
                    newChat()
                    setChatTitle('')
                }}
                className='text-accent text-xl bg-accent px-4 rounded-full bg-opacity-80 disabled:opacity-50 disabled:pointer-events-none'
                whileHover={{
                    scale: 1.05
                }}
            >
                create
            </motion.button>
        </div>
    )
})