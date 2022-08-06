// * react
import {useState, useEffect, useCallback} from 'react'
import { useRouter } from 'next/router';
import {useSelector} from 'react-redux'

// * supabase
import { supabase } from 'supabase/supabaseClient';
import { fetchAllUsers} from 'supabase/modules/user';
import { addGroupChat, addPrivatChat} from 'supabase/modules/chat';

const useStore = () => {
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
      }, [newOrUpdatedUser])

    return {newOrUpdatedUser}
}

export function useCreateChatPanel() {
    const [chatTitle, setChatTitle] = useState('')
    const [selectedUsers, setSelectedUsers] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [seacrhedUsers, setSearchedUsers] = useState([])
    const [allUsers, setAllUser] = useState(null)
    const [filteredUsers, setFilteredUsers] = useState([])

    const {user} = useSelector(state => state.auth)
    const {newOrUpdatedUser} = useStore({})

    const router = useRouter()

    const onChangeChatTitle = useCallback(e => {
        const {value} = e.target
        setChatTitle(value)
    }, [])

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

    // ** следит за изменениями значения 
    const onChangeSearchValue = useCallback(e => {
        const {value} = e.target
        setSearchValue(value)
    }, [])

    useEffect(() => {
        if (filteredUsers !== null) {
            const searched = filteredUsers.filter(user => (user.username_google ? user.username_google : user.username).toLowerCase().includes(searchValue.toLowerCase()))
            setSearchedUsers(searched)
        }
    }, [searchValue])

    // ** функция выбора пользователей для создания чата
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

    const createChat = () => {
        newChat()
        setChatTitle('')
    }

    const userListCondition = filteredUsers !== null && seacrhedUsers.length === 0 && searchValue.length === 0
    const searchUserCondition = seacrhedUsers !== null && seacrhedUsers.length > 0

    return {
        models: {
            user,
            chatTitle,
            selectedUsers,
            allUsers,
            seacrhedUsers,
            filteredUsers,
            userListCondition,
            searchUserCondition,
        },
        commands: {
            onChangeChatTitle,
            onChangeSearchValue,
            selectUser,
            newChat,
            createChat,
        }
    }
}