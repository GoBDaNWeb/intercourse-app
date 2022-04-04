import UserContext from './UserContext'
import { useEffect, useState } from 'react';
import { supabase } from './../utils/supabaseClient';
import { useRouter } from 'next/router';

const AppProvider = (props) => {
    // const [userLoaded, setUserLoaded] = useState(false)
	const [user, setUser] = useState(null)
	const [session, setSession] = useState(null)
	const [error, setError] = useState(null)
	// const [userRoles, setUserRoles] = useState([])

    const router = useRouter()

    const [wrongPassword, setWrongPassword] = useState(false)
	useEffect(() => {
		// const session = supabase.auth.session()
		// setSession(session)
		// setUser(session?.user ?? null)
		// setUserLoaded(session ? true : false)

		// const { data: authListener } = supabase.auth.onAuthStateChange(async (session) => {
		// 	setSession(session)
		// 	const currentUser = session?.user
		// 	setUser(currentUser ?? null)
		// 	setUserLoaded(!!currentUser)
		// 	if (currentUser) {
		// 	  signIn(currentUser.id, currentUser.email)
		// 	  Router.push('/home')
		// 	}
		// })
		
		// return () => {
		// 	authListener.unsubscribe()
		// }
        console.log(user);
        const session = supabase.auth.session()
        setUser(session?.user ?? null) 
        setSession(session)

        if (router.pathname === '/' && user) {
            router.push('/home')
        }

        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            // setSession(session)
			// const currentUser = session?.user
			// setUser(currentUser ?? null)
            // if (currentUser) {
            //     router.push('/home')
            // }
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

    const signUp = async (email, password, confirm) => {
        if(password !== confirm) {
            setWrongPassword(true)
            return
        }
        await supabase.auth.signUp({email, password})
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
            {props.children}
        </UserContext.Provider>
    )
}

export default AppProvider