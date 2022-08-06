// * react/next
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// * redux
import {useSelector, useDispatch} from 'react-redux'
import {setPrivatChatData, setGroupChatData} from 'store/chatSlice'

// * hooks 
import {useUser} from 'hooks/useUser'

// * supabase
import { updateUserTypingAnyway, updateUserTypingChat } from 'supabase/modules/user'
import { fetchOnePrivatChat, fetchOneGroupChat } from 'supabase/modules/chat'


export function useChats() {
    const [typingData, setTypingData] = useState(null)

    const dispatch = useDispatch()
    
    const router = useRouter()
    const { id: chatId } = router.query

    const {newOrUpdatedUser} = useUser()

    const {user} = useSelector(state => state.auth)
    const {privatChatData, groupChatData} = useSelector(state => state.chat)
    
    const userCondition = newOrUpdatedUser !== null && user !== null && user.id !== newOrUpdatedUser.id

    const typingDataObj = {
        typing: newOrUpdatedUser?.is_typing, 
        name: newOrUpdatedUser?.username || newOrUpdatedUser?.username_google, 
        chat: newOrUpdatedUser?.typing_chat
    }

    // ** при изменении newOrUpdatedUser записыват данные о том печатает ли пользователь в state
    useEffect(() => {
        if (userCondition) {
            setTypingData(typingDataObj)
        }
    }, [newOrUpdatedUser, userCondition])

    // ** при изменении адреса обновляет данные о пользователе
    useEffect(() => {
        if (user !== null) {
            updateUserTypingChat(user.id, chatId)
            updateUserTypingAnyway(user.id)
        }
        if (userCondition) {
            setTypingData(typingDataObj)
        }
    }, [chatId, userCondition])

    // ** при изменении маршрута в зависимости от типа чата записывает соответствующие данные 
    useEffect(() => {
        if (router.query.type === 'p') {
            const data = fetchOnePrivatChat(chatId)
            data.then(chat => dispatch(setPrivatChatData(chat)))
        }
        if (router.query.type === 'g') {
            const data = fetchOneGroupChat(chatId)
            data.then(chat => dispatch(setGroupChatData(chat)))
        }
    }, [chatId, router.query.type])

    return {
        models: {
            typingData,
            privatChatData,
            groupChatData
        }
    }
}