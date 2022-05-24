// * react/next
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {useTranslation} from 'next-i18next'

// * redux
import {useSelector} from 'react-redux'

// * framer-motion
import {motion} from 'framer-motion'

// * supabase
import { supabase } from 'utils/supabaseClient';
import { addPrivatChat, addGroupChat, fetchAllUsers} from 'utils/Store';

// * icons
import {BsArrowLeftShort} from 'react-icons/bs'
import {BiMessageAdd} from 'react-icons/bi'

// * components
import UserSelectCard from './Chat/UserSelectCard';

export default function CreateChat() {
    const [createChat, setCreateChat] = useState(false)
    const [chatTitle, setChatTitle] = useState('')
    const [searchValue, setSearchValue] = useState('')
    const [allUsers, setAllUser] = useState(null)
    const [filteredUsers, setFilteredUsers] = useState([])
    const [seacrhedUsers, setSearchedUsers] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])

    const {t} = useTranslation('common')

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
            const filtered = allUsers.filter(item => item.id !== user.id)
            setFilteredUsers(filtered)
        }
    }, [allUsers])

    useEffect(() => {
        if (filteredUsers !== null) {
            const searched = filteredUsers.filter(user => (user.username_google ? user.username_google : user.username).toLowerCase().includes(searchValue.toLowerCase()))
            console.log(searched);
            setSearchedUsers(searched)
        }
    }, [searchValue])

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
    const onChange = (e, type) => {
        const {value} = e.target
        if (type === 'chatTitle') {
            setChatTitle(value)
        } else if (type === 'searchValue') {
            setSearchValue(value)
        }
    }

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

    // ** функция монтирования/размонтирования элемента createChat 
    const createChatWindow = () => {
        setCreateChat(!createChat)
    }
    
    return (
        <div>
            {
                !createChat &&
                <div className='flex items-center justify-center w-full '>
                    <div 
                        onClick={() => createChatWindow()}
                        className='transition-all duration-[0.4s] bg-secondary text-primary h-96 w-96 flex flex-col items-center justify-center gap-4 rounded-2xl cursor-pointer border-2 border-solid border-gray-200 dark:border-gray-800'
                    >
                        <h3 className='text-3xl font-medium'>
                            {t('create-chat.create-chat-msg')}
                        </h3>
                        <BiMessageAdd className='text-9xl'/>
                        <h5 className='text-4xl font-bold'>
                            {t('create-chat.click')}
                        </h5>
                    </div>
                </div>
            }
            {
                createChat 
                &&
                <div className='flex items-center justify-center w-full'>
                    <div className='transition-all duration-[0.4s] bg-secondary w-[26rem] flex flex-col items-center justify-evenly gap-4 rounded-2xl border-2 border-solid border-gray-200 dark:border-gray-800 relative py-8 px-4'>
                        <div className='text-secondary'>
                            <h2 className='font-bold text-2xl text-primary'>
                                {t('create-chat.create-chat-title')}
                            </h2>
                            <h5 className='flex items-center gap-1'>
                                <span className='text-3xl'>&#9737;</span> {t('create-chat.create-chat-hint-1')}
                            </h5>
                            <h5 className='flex items-center gap-1'>
                                <span className='text-3xl'>&#9737;</span> {t('create-chat.create-chat-hint-2')}
                            </h5>
                        </div>
                        <label className='flex flex-col items-center'>
                            <div className='text-center text-primary text-2xl font-semibold relative w-full'>
                                <h3>
                                    {t('create-chat.chat-title')}
                                </h3>
                                {/* <AiOutlineQuestionCircle className='absolute right-3 top-[5px] text-secondary opacity-40 cursor-pointer'/> */}
                            </div>
                            <input 
                                onChange={(e) => onChange(e, 'chatTitle')}
                                className='transition-all duration-[0.4s] text-primary bg-primary outline-none px-4 py-2 rounded-[20px] border-2 border-solid border-gray-200 dark:border-gray-800 bg-opacity-80'
                                placeholder={t('create-chat.enter-title')}
                                type="text"
                            />
                        </label>
                        <div className='w-full'>
                            <input 
                                onChange={(e) => onChange(e, 'searchValue')}
                                className='transition-all duration-[0.4s]  w-full text-primary bg-primary outline-none px-4 py-2 rounded-t-[20px] border-2 border-b-0 border-solid border-gray-200 dark:border-gray-800 bg-opacity-80'
                                placeholder={t('create-chat.search-user')}
                                type="text" 
                            />
                            <div className='transition-all duration-[0.4s]  border-2 border-solid border-gray-200 dark:border-gray-800 flex flex-col items-center bg-opacity-80 w-full h-[244px] rounded-b-[20px] overflow-auto custom-scroll'>
                            {
                                    filteredUsers !== null && seacrhedUsers.length === 0
                                    && searchValue.length === 0 && filteredUsers.map((user, index) => (
                                        <UserSelectCard key={user.id} user={user} index={index} selectedUsers={selectedUsers} selectUser={selectUser}/>
                                    ))
                            }
                            {
                                seacrhedUsers !== null && seacrhedUsers.length > 0
                                && seacrhedUsers.map((user, index) => (
                                    <UserSelectCard key={user.id} user={user} index={index} selectedUsers={selectedUsers} selectUser={selectUser}/>
                                ))
                            }
                            </div>
                        </div>
                        <div className='flex flex-col gap-1 items-center justify-center'>
                            <div className='h-8'>
                                {
                                    selectedUsers.length ?
                                    <h6 className='text-secondary text-sm'>
                                        you create <span className='italic font-bold'>{selectedUsers.length > 1 ? 'group' : 'privat'}</span>  chat
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
                                {t('create-chat.create')}
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
                            {t('create-chat.back')}
                        </motion.button>
                    </div>
                </div>
            }
        </div>
    )
}