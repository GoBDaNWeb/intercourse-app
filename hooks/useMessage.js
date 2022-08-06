// * react/next
import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'

// * redux
import {useDispatch, useSelector} from 'react-redux'
import {setNotificationForSound, setNotification, setMessages} from 'store/chatSlice'

// * supabsae
import { supabase } from 'supabase/supabaseClient';
import { fetchMessages } from 'supabase/modules/message';

// * howler
import { Howl } from 'howler';

export function useMessage() {
    const [newMessage, handleNewMessage] = useState(null)
    
    const router = useRouter()
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    const {messages, notification} = useSelector(state => state.chat)

    useEffect(() => {
        // ** функция вызова звука 
        const callSound = (src) => {
            const sound = new Howl({
                src,
                html5: true
            })
            sound.play()
        }
        
        // ** подписываемся на обновления messages 
        supabase
            .from('messages')
            .on('INSERT', payload => {
                if (
                        user !== null 
                        && user.id !== payload.new.user_id 
                        && router.query.id !== payload.new.chat_id 
                        || router.pathname === '/main'
                    ) {
                    if (!notification.includes(payload.new)) {
                        dispatch(setNotificationForSound(payload.new))
                        dispatch(setNotification(payload.new))
                        callSound('/notification.mp3')
                        console.log('sound');
                    }
                }
                handleNewMessage(payload.new)
            })
            .on('UPDATE', payload => {console.log(payload)})
            .on('DELETE', payload => {handleNewMessage(payload.old)})
            .subscribe()
    }, [router.isReady])

    useEffect(() => {
        if(newMessage && newMessage.chat_id === router.query.id) {
            dispatch(setMessages(messages.concat(newMessage)))
        }
    }, [newMessage])

    useEffect(() => {
        if  (router.query.id) {
            fetchMessages(router.query.id, (messages) => {
                dispatch(setMessages(messages))
            })
        }
    }, [router.query.id])
}