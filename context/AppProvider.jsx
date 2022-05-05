import AppContext from './AppContext'
import { useEffect, useState } from 'react';
import { supabase } from './../utils/supabaseClient';
import { useRouter } from 'next/router';
import ChatContext from './ChatContext';
import { fetchUserAvatar, updateUserStatus } from 'utils/Store';
import {useDispatch, useSelector} from 'react-redux'
import {setUser} from 'store/authSlice'
import {setBgChat} from 'store/chatSlice'
import {setAvatar} from 'store/profileSlice'
import {setTheme} from 'store/themeSlice'

const AppProvider = (props) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)

	useEffect(() => {
        const session = supabase.auth.session() 
        dispatch(setUser(session?.user ?? null))

        if (router.pathname === '/' && user) {
            router.push('/home')
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

        console.log('xyu');

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

    // ** ChatContext provider 
    const [isPersonalChats, setIsPersonalChats] = useState(true)
    const [searchValue, setSearchValue] = useState('')
    const [showSetting, setShowSetting] = useState(false)

    const handleTypeChats = () => {
        setIsPersonalChats(!isPersonalChats)
    }

    const handleShowSetting = () => {
        setShowSetting(!showSetting)
    }

    return (
        <AppContext.Provider value={{}}>
            <ChatContext.Provider value={{
                handleTypeChats,
                isPersonalChats,
                setSearchValue,
                searchValue,
                showSetting,
                handleShowSetting,
                setShowSetting
            }}>
                {props.children}
            </ChatContext.Provider>
        </AppContext.Provider>
    )
}

export default AppProvider