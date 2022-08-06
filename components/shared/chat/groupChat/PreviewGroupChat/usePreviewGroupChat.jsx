// * react/next
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

// * redux
import { useSelector, useDispatch } from "react-redux";
import {clearNotification} from 'store/chatSlice'
import {closeSidebar} from 'store/sidebarSlice'

export function usePreviewGroupChat({chatData}) {
    const [currentNotification, setCurrentNotification] = useState([])

    const {notification} = useSelector(state => state.chat)

    const dispatch = useDispatch()
    const router = useRouter()

    const currentChat = (chatData && router.query?.id === chatData.id);

    const openChat = () => {
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
            currentNotification,
            currentChat
        },
        commands: {
            openChat
        }
    }
}