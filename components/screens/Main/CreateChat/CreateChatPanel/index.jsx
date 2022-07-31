// * react/next
import { useState } from 'react';

// * framer-motion
import {motion} from 'framer-motion'

// * icons
import {BsArrowLeftShort} from 'react-icons/bs'

// * components
import CreateChatHeading from './CreateChatHeading';
import UserList from './UserList';
import CreateInfo from './CreateInfo';

export default function CreateChatPanel({createChatWindow}) {
    const [chatTitle, setChatTitle] = useState('')
    const [selectedUsers, setSelectedUsers] = useState([])

    
    const onChangeChatTitle = (e) => {
        const {value} = e.target
        setChatTitle(value)
    }
    return (
        <div className='flex items-center justify-center w-full'>
            <div className='transition-all duration-[0.4s] bg-secondary w-[26rem] flex flex-col items-center justify-evenly gap-4 rounded-2xl border-2 border-solid border-gray-200 dark:border-gray-800 relative py-8 px-4'>
                <CreateChatHeading/>
                <label className='flex flex-col items-center'>
                    <div className='text-center text-primary text-2xl font-semibold relative w-full'>
                        <h3>
                            chat title
                        </h3>
                    </div>
                    <input 
                        onChange={onChangeChatTitle}
                        className='transition-all duration-[0.4s] text-primary bg-primary outline-none px-4 py-2 rounded-[20px] border-2 border-solid border-gray-200 dark:border-gray-800 bg-opacity-80'
                        placeholder='enter title'
                        type="text"
                    />
                </label>
                <UserList 
                    selectedUsers={selectedUsers} 
                    setSelectedUsers={setSelectedUsers}
                />
                <CreateInfo
                    selectedUsers={selectedUsers}
                    chatTitle={chatTitle}
                    setChatTitle={setChatTitle}
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
        </div>
    )
}