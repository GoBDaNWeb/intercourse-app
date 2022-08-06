// * react/next
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// * redux
import { useSelector, useDispatch } from "react-redux";
import {clearNotification} from 'store/chatSlice'
import {closeSidebar} from 'store/sidebarSlice'

export function usePreviewPrivatChat({chatData}) {
    const [currentNotification, setCurrentNotification] = useState([])

    const dispatch = useDispatch()

    const {notification} = useSelector(state => state.chat)
    const {user} = useSelector(state => state.auth)

    const router = useRouter()
    const chatId = chatData?.id

    const currentChat = (chatData && router.query.id === chatId);  

    const openChat = (chatId) => {
        dispatch(clearNotification(notification.filter(item => item.chat_id !== chatId)))
        if (document.scrollingElement.clientWidth <= 600) {
            dispatch(closeSidebar())
        }
    }

    useEffect(() => {
        const notificationByCurrentChat = notification.filter(item => item.chat_id === chatId)
        setCurrentNotification(notificationByCurrentChat)
    }, [notification])

    return {
        models: {
            user,
            currentNotification,
            currentChat
        },
        commands: {
            openChat
        }
    }
}