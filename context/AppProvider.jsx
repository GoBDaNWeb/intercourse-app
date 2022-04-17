import UserContext from './UserContext'
import { useEffect, useState } from 'react';
import { supabase } from './../utils/supabaseClient';
import { useRouter } from 'next/router';
import ChatContext from './ChatContext';
import { useStore, fetchAllPersonalChannels } from './../utils/Store';

const AppProvider = (props) => {
    // const [userLoaded, setUserLoaded] = useState(false)
	const [user, setUser] = useState(null)
	const [session, setSession] = useState(null)
	const [error, setError] = useState(null)
    

    const router = useRouter()

    const [wrongPassword, setWrongPassword] = useState(false)
	useEffect(() => {
        console.log(user);
        const session = supabase.auth.session()
        setUser(session?.user ?? null) 
        setSession(session)

        if (router.pathname === '/' && user) {
            router.push('/home')
        }

        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event == 'SIGNED_IN') {
                console.log('SIGNED_IN', session)
                setUser(session?.user ?? null) 
            }
            if (event == 'SIGNED_OUT') {
                console.log('SIGNED_OUT', session)
                setUser(session?.user ?? null) 
            }
        })
        
        return () => {
            authListener.unsubscribe()
        }
	}, [user]);

    const signUp = async (username, email, password, confirm) => {
        if(password !== confirm) {

            setWrongPassword(true)
            return
        }
        await supabase.auth.signUp(
            { 
                email, password
            },
            {
                data: {
                    username
                }
            }
        )
        router.push('/home')
    }

    const signIn = async (email, password) => {
        const {error} = await supabase.auth.signIn({email, password})
        if (error) {
            setError(error)
        } else {
            router.push('/home')
        }
    }

    const signOut = async () => {
        await supabase.auth.signOut()
        router.push('/')
    }


    // ** ChatContext provider 
    const [isPersonalChats, setIsPersonalChats] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    const handleTypeChats = () => {
        setIsPersonalChats(!isPersonalChats)
    }

    return (
        <UserContext.Provider value={{
            signUp,
            signIn,
            signOut,
            wrongPassword,
            user,
            error,
            setError
        }}>
            <ChatContext.Provider value={{
                handleTypeChats,
                isPersonalChats,
                setSearchValue,
                searchValue
            }}>
                {props.children}
            </ChatContext.Provider>
        </UserContext.Provider>
    )
}

export default AppProvider