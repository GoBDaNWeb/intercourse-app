// * react/next 
import {memo} from 'react'

// * react
import {useState, useEffect, useCallback} from 'react'
import { useRouter } from 'next/router';
import {useSelector} from 'react-redux'

// * supabase
import { supabase } from 'supabase/supabaseClient';
import { fetchAllUsers} from 'supabase/modules/user';
import { addGroupChat, addPrivatChat} from 'supabase/modules/chat';

// * framer-motion
import {motion} from 'framer-motion'

// * icons
import {BsArrowLeftShort} from 'react-icons/bs'

// * components
import CreateChatHeading from './CreateChatHeading';
import UserList from './UserList';
import CreateInfo from './CreateInfo';
import ChatTitleForm from './ChatTitleForm';

const CreateChatPanel = memo(({createChatWindow}) => {
    const [selectedUsers, setSelectedUsers] = useState([])
    const [chatTitle, setChatTitle] = useState('')

    const onChangeChatTitle = useCallback(e => {
        const {value} = e.target
        setChatTitle(value)
    }, [])

    const selectUser = useCallback(user => {
        const tmpArr = selectedUsers
        if (selectedUsers.includes(user)) {
            const filtered = tmpArr.filter(item => item.id !== user.id)
            setSelectedUsers([...filtered])
        }
        if (!selectedUsers.includes(user)) {
            tmpArr.push(user)
            setSelectedUsers([...tmpArr])
        }
    }, [selectedUsers])

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

    const createChat = () => {
        newChat()
        setChatTitle('')
    }

    return (
        <>
            <div className='transition-all duration-[0.4s] bg-secondary w-[26rem] flex flex-col items-center justify-evenly gap-4 rounded-2xl border-2 border-solid border-gray-200 dark:border-gray-800 relative py-8 px-4'>
                <CreateChatHeading/>
                <ChatTitleForm
                    onChangeChatTitle={onChangeChatTitle}
                    chatTitle={chatTitle}
                />
                <UserList
                    selectUser={selectUser}
                    selectedUsers={selectedUsers}
                />
                <CreateInfo
                    selectedUsers={selectedUsers}
                    chatTitle={chatTitle}
                    createChat={createChat}
                />
                <motion.button
                    onClick={createChatWindow}
                    className='absolute top-4 right-4 flex items-center font-semibold text-primary'
                    whileHover={{
                        x: -8
                    }}
                >
                    <BsArrowLeftShort className='text-2xl text-primary'/>
                    back
                </motion.button>
            </div>
        </>
    )
})

CreateChatPanel.displayName = 'CreateChatPanel';

export default CreateChatPanel