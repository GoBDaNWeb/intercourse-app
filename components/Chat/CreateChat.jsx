import { useState } from 'react';
import {motion} from 'framer-motion'
import {BsArrowLeftShort} from 'react-icons/bs'
import {BiMessageAdd} from 'react-icons/bi'
import {AiOutlineQuestionCircle} from 'react-icons/ai'
import { addPersonalChat, addGroupChat, fetchAllUsers} from 'utils/Store';
import { useEffect } from 'react';
import UserSelectCard from './UserSelectCard';
import {useSelector} from 'react-redux'
import { useStore } from 'utils/Store';
import { supabase } from 'utils/supabaseClient';
import { useRouter } from 'next/router';

export default function CreateChat() {
    const [createChat, setCreateChat] = useState(true)
    const [chatTitle, setChatTitle] = useState('')
    const [allUsers, setAllUser] = useState(null)
    const [filteredUser, setFilteredUser] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])

    const router = useRouter()
    const {user} = useSelector(state => state.auth)

    // ** при монтировании/размонтировании подписываемся/отписываемся на realtime
    const useStore = (props) => {
        const [users] = useState(new Map())
        const [newOrUpdatedUser, handleNewOrUpdatedUser] = useState(null)

        useEffect(() => {
            const userListener = supabase
                .from('users')
                .on('*', payload => {
                    // console.log(payload)
                    handleNewOrUpdatedUser(payload.new)
                })
                .subscribe()
    
            return () => {
                userListener.unsubscribe()
            }
        }, [])
    
        useEffect(() => {
            if (newOrUpdatedUser) users.set(newOrUpdatedUser.id, newOrUpdatedUser)
            console.log('update', newOrUpdatedUser)
          }, [newOrUpdatedUser])
    
        return {newOrUpdatedUser}
    }

    const {newOrUpdatedUser} = useStore({})

    // ** при монтировании элемента получает данные о всех пользователях
    useEffect(() => {
        const data = fetchAllUsers()
        data.then(users => {
            setAllUser(users)
        })
    }, [newOrUpdatedUser])

    // ** при изменениями allUsers фильтрует полученные данные 
    useEffect(() => {
        if(allUsers !== null) {
            const filteredUsers = allUsers.filter((item) => item.id !== user.id)
            setFilteredUser(filteredUsers)
        }
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
        const randomId = len => Math.random().toString(36).substr(3, len);
        const id = randomId(15);
        if (selectedUsers.length === 1) {
            addPersonalChat(id, user, selectedUsers[0], chatTitle)
            router.push({pathname:'chats/[id]', query: {type: 'p', id: `${id}`}})
        }
        if (selectedUsers.length > 1) {
            addGroupChat(id, user, selectedUsers, chatTitle)
            router.push({pathname:'chats/[id]', query: {type: 'g', id: `${id}`}})
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
                        className='bg-secondary text-primary h-96 w-96 flex flex-col items-center justify-center gap-4 rounded-2xl cursor-pointer border-2 border-solid border-gray-200 dark:border-gray-800'
                    >
                        <h3 className='text-3xl font-medium'>Want to create a chat?</h3>
                        <BiMessageAdd className='text-9xl'/>
                        <h5 className='text-4xl font-bold'>Click</h5>
                    </div>
                </div>
            }
            {
                createChat 
                &&
                <div className='flex items-center justify-center w-full'>
                    <div className='bg-secondary w-[26rem] flex flex-col items-center justify-evenly gap-4 rounded-2xl border-2 border-solid border-gray-200 dark:border-gray-800 relative py-8 px-4'>
                        <div className='text-secondary'>
                            <h2 className='font-bold text-2xl text-primary'>
                                create chat
                            </h2>
                            <h5 className='flex items-center gap-1'>
                                <span className='text-3xl'>&#9737;</span> select one user to create personal chat
                            </h5>
                            <h5 className='flex items-center gap-1'>
                                <span className='text-3xl'>&#9737;</span> select multiple users to create group chat
                            </h5>
                        </div>
                        <label className='flex flex-col items-center'>
                            <div className='text-center text-primary text-2xl font-semibold relative w-full'>
                                <h3>
                                    chat title
                                </h3>
                                <AiOutlineQuestionCircle className='absolute right-3 top-[5px] text-secondary opacity-40 cursor-pointer'/>
                            </div>
                            <input 
                                onChange={(e) => onChange(e)}
                                className='text-primary bg-primary outline-none px-4 py-2 rounded-[20px] border-2 border-solid border-gray-200 dark:border-gray-800 bg-opacity-80'
                                placeholder='enter title'
                                type="text"
                            />
                        </label>
                        <div className='border-2 border-solid border-gray-200 dark:border-gray-800 flex flex-col items-center bg-opacity-80 w-full h-[244px] rounded-[20px] overflow-auto'>
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
                                    <h6 className='text-secondary text-sm'>
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
                                className='text-accent text-xl bg-accent px-4 rounded-full bg-opacity-80 disabled:opacity-50 disabled:pointer-events-none'
                                whileHover={{
                                    scale: 1.05
                                }}
                            >
                                create
                            </motion.button>
                        </div>
                        <motion.button
                            onClick={() => createChatWindow()}
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
            }
        </div>
    )
}