// * react/next
import { useEffect } from 'react';
import {useRouter} from 'next/router'

// * redux
import {useDispatch, useSelector} from 'react-redux'
import {setUser, setAvatar} from 'store/authSlice'
import {setBgChat} from 'store/chatSlice'
import {setTheme} from 'store/themeSlice'

// * supabsae
import { supabase } from 'supabase/supabaseClient';
import { fetchUserAvatar, updateUserStatus } from 'supabase/modules/user';

export function useAuth() {
    const router = useRouter()
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)

    useEffect(() => {
        const session = supabase.auth.session() 
        dispatch(setUser(session?.user ?? null))

        if (router.pathname === '/' && user) {
            router.push('/main')
        } 

        // ** при загрузке берем данные из localStorage при их наличии 
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
}