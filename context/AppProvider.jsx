// * react/next
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AppContext from './AppContext'

// * redux
import {useDispatch, useSelector} from 'react-redux'
import {setUser} from 'store/authSlice'
import {setBgChat, setMessages, setNotificationForSound, setNotification} from 'store/chatSlice'
import {setAvatar} from 'store/profileSlice'
import {setTheme} from 'store/themeSlice'

// * supabsae
import { supabase } from 'utils/supabaseClient';
import { fetchUserAvatar, updateUserStatus, fetchMessages } from 'utils/Store';

// * howler
import { Howl } from 'howler';

const AppProvider = (props) => {
    const [newMessage, handleNewMessage] = useState(null)
    
    const router = useRouter()
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    const {notification,  messages} = useSelector(state => state.chat)

    console.log(router.query.id)

	useEffect(() => {
        const session = supabase.auth.session() 
        dispatch(setUser(session?.user ?? null))

        const callSound = (src) => {
            const sound = new Howl({
                src,
                html5: true
            })
            sound.play()
        }

        supabase
            .from('messages')
            .on('INSERT', payload => {
                if (user.id !== payload.new.user_id && router.query.id !== payload.new.chat_id) {
                    if (!notification.includes(payload.new)) {
                        dispatch(setNotificationForSound(payload.new))
                        dispatch(setNotification(payload.new))
                        callSound('/notification.mp3')
                    }
                }
                handleNewMessage(payload.new)
            })
            .on('UPDATE', payload => {console.log(payload)})
            .on('DELETE', payload => {handleNewMessage(payload.old)})
            .subscribe()


        if (router.pathname === '/' && user) {
            router.push('/main')
        }

        if (user !== null) {
            if (!localStorage.getItem('bgChat')) {
                localStorage.setItem('bgChat', 'standart')
            }
            let bgChat = localStorage.getItem('bgChat')
            dispatch(setBgChat(bgChat))
            dispatch(setTheme(localStorage.getItem('isDarkTheme')))
            const fetchData = fetchUserAvatar(user.id)
            fetchData.then(data => dispatch(setAvatar(data[0].avatar)))
        }

        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event == 'SIGNED_IN') {
                console.log('SIGNED_IN', session)
                
                
                dispatch(setUser(session?.user ?? null))
                updateUserStatus(session.user.id, 'ONLINE')
            }
            if (event == 'SIGNED_OUT') {
                console.log('SIGNED_OUT', session)
                console.log(user)
                dispatch(setUser(session?.user ?? null))
            }
        })
        
        return () => {
            authListener.unsubscribe()
        }
	}, [user]);

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

    return (
        <AppContext.Provider value={{}}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppProvider