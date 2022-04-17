import { useState, useContext } from 'react';
import {motion} from 'framer-motion'
import {BsArrowLeftShort} from 'react-icons/bs'
import {BiMessageAdd} from 'react-icons/bi'
import { addPersonalChat, addGroupChat, fetchAllUsers} from 'utils/Store';
import UserContext from './../../context/UserContext';
import { useEffect } from 'react';
import UserSelectCard from './UserSelectCard';

export default function CreateChat() {
    const [createChat, setCreateChat] = useState(false)
    const [chatTitle, setChatTitle] = useState('')
    const [allUsers, setAllUser] = useState([])
    const [filteredUser, setFilteredUser] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])

    const {user} = useContext(UserContext)

    // ** при монтировании элемента получает данные о всех пользователях
    useEffect(() => {
        const data = fetchAllUsers()
        data.then(users => {;
            setAllUser(users)
        })
    }, [])

    // ** при изменениями allUsers фильтрует полученные данные 
    useEffect(() => {
            const filteredUsers = allUsers.filter((item) => item.id !== user.id)
            setFilteredUser(filteredUsers)
    }, [allUsers])

    // ** функция выбора пользователей для создания чата
    const selectUser = (user) => {
        const tmpArr = selectedUsers
        if(selectedUsers.includes(user)) {
            const filtered = tmpArr.filter(item => item.id !== user.id)
            setSelectedUsers([...filtered])
        }
        if(!selectedUsers.includes(user)) {
            tmpArr.push(user)
            setSelectedUsers([...tmpArr])
        }
    }

    // ** следит за изменениями значения chatTitle
    const onChange = (e) => {
        const {value} = e.target
        setChatTitle(value)
    }

    // ** функция создания нового группового/персонального чата
    const newChat = () => {
        if (selectedUsers.length === 1) {
            addPersonalChat(user, selectedUsers[0], chatTitle)
        }
        if (selectedUsers.length > 1) {
            addGroupChat(user, selectedUsers, chatTitle)
        }
    }

    // ** функция монтирования/размонтирования элемента createChat 
    const createChatWindow = () => {
        setCreateChat(!createChat)
    }
    
    return (
        <div>
            {
                !createChat &&
                <div className='flex items-center justify-center w-full'>
                    <div 
                        onClick={() => createChatWindow()}
                        className='bg-[#537072] h-96 w-96 flex flex-col items-center justify-center gap-4 rounded-2xl cursor-pointer shadow-custom'
                    >
                        <h3 className='text-white text-3xl font-medium'>Want to create a chat?</h3>
                        <BiMessageAdd className='text-white text-9xl'/>
                        <h5 className='text-white text-4xl font-bold'>Click</h5>
                    </div>
                </div>
            }
            {
                createChat 
                &&
                <div className='flex items-center justify-center w-full'>
                    <div className='bg-[#537072] w-[26rem] flex flex-col items-center justify-evenly gap-4 rounded-2xl shadow-custom relative py-8 px-4'>
                        <div className='text-gray-300'>
                            <h2 className='font-bold text-2xl text-white'>
                                create chat
                            </h2>
                            <h5 className='flex items-center gap-1'>
                                <span className='text-3xl text-white'>&#9737;</span> select one user to create personal chat
                            </h5>
                            <h5 className='flex items-center gap-1'>
                                <span className='text-3xl text-white'>&#9737;</span> select multiple users to create group chat
                            </h5>
                        </div>
                        <label className='flex flex-col items-center'>
                            <h3 className='text-white text-2xl font-semibold'>
                                chat title
                            </h3>
                            <input 
                                onChange={(e) => onChange(e, 'group')}
                                className='outline-none px-4 py-2 rounded-[20px] bg-[#2C4A52] bg-opacity-80 text-white'
                                placeholder=''
                                type="text"
                            />
                        </label>
                        <div className='bg-[#2C4A52] flex flex-col items-center gap-1 bg-opacity-80 w-full h-[244px] rounded-[20px] p-1 overflow-auto'>
                           {
                                filteredUser !== null
                                ? filteredUser.map((user, index) => (
                                    <UserSelectCard key={user.id} user={user} index={index} selectedUsers={selectedUsers} selectUser={selectUser}/>
                                ))
                                : <div>empty list</div>
                           }
                        </div>
                        <div className='flex flex-col gap-1 items-center justify-center'>
                            <div className='h-8'>
                                {
                                    selectedUsers.length ?
                                    <h6 className='text-gray-200 text-sm'>
                                        you create <span className='italic font-bold'>{selectedUsers.length > 1 ? 'group' : 'personal'}</span>  chat
                                    </h6>
                                    : ''
                                }
                            </div>
                            <motion.button 
                                disabled={!chatTitle.length || !selectedUsers.length}
                                onClick={() => {
                                    newChat()
                                    setChatTitle('')
                                }}
                                className='text-white text-xl bg-[#2C4A52] px-4 rounded-full bg-opacity-80 disabled:opacity-50 disabled:pointer-events-none'
                                whileHover={{
                                    scale: 1.05
                                }}
                            >
                                create
                            </motion.button>
                        </div>
                        <motion.button
                            onClick={() => createChatWindow()}
                            className='absolute top-4 right-4 flex items-center font-semibold text-gray-200'
                            whileHover={{
                                x: -8
                            }}
                        >
                            <BsArrowLeftShort className='text-2xl text-gray-200'/>
                            back
                        </motion.button>
                    </div>
                </div>
            }
        </div>
    )
}