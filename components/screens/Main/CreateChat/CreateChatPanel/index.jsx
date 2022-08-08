// * react/next 
import {useState, memo, useCallback} from 'react'
import { useRouter } from 'next/router';

// * redux 
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

const CreateChatPanel = memo(({handleCreateChatWindow}) => {
    const [selectedUsers, setSelectedUsers] = useState([])
    const [chatTitle, setChatTitle] = useState('')

    const {user: currentUser} = useSelector(state => state.auth)
    const router = useRouter()

    const onChangeChatTitle = useCallback(e => {
        const {value} = e.target
        setChatTitle(value)
    }, [])

    const addSelectedUser = (user) => {
        const tmpArr = selectedUsers
        tmpArr.push(user)
        setSelectedUsers([...tmpArr])
    }

    const removeSelectedUser = (user) => {
        const tmpArr = selectedUsers
        const filtered = tmpArr.filter(item => item.id !== user.id)
        setSelectedUsers([...filtered])
    }

    const handleSelectUser = useCallback(user => {
        selectedUsers.includes(user) && removeSelectedUser(user)
        !selectedUsers.includes(user) && addSelectedUser(user)
    }, [selectedUsers])

    const createPrivateChat = (id, user, selectedUser, chatTitle) => {
        addPrivatChat(id, user, selectedUser, chatTitle)
        router.push({pathname:'chats/[id]', query: {type: 'p', id: `${id}`}})
    }
    
    const createGroupChat = (id, user, selectedUsers, chatTitle) => {
        addGroupChat(id, user, selectedUsers, chatTitle)
        router.push({pathname:'chats/[id]', query: {type: 'g', id: `${id}`}})
    }

    const randomId = len => Math.random().toString(36).substr(3, len);

    const newChat = () => {
        const id = randomId(15);
        selectedUsers.length === 1 && createPrivateChat(id, currentUser, selectedUsers[0], chatTitle)
        selectedUsers.length > 1 && createGroupChat(id, currentUser, selectedUsers, chatTitle)
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
                    handleSelectUser={handleSelectUser}
                    selectedUsers={selectedUsers}
                />
                <CreateInfo
                    selectedUsers={selectedUsers}
                    chatTitle={chatTitle}
                    createChat={createChat}
                />
                <motion.button
                    onClick={handleCreateChatWindow}
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