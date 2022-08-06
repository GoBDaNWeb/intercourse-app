// * react/next
import { useState, useCallback } from 'react'

// * redux
import {useDispatch} from 'react-redux'
import { clearError, signInWithProvider } from 'store/authSlice';


export function useAuthPanel() {
    const [authComponent, setAuthComponent] = useState('Login')

	const dispatch = useDispatch()

	const selectAuthComponent = useCallback(type => {
		setAuthComponent(type)
		dispatch(clearError())
	}, [])

    const handleSignInWithProvider = () => {
        dispatch(signInWithProvider('google'))
    }

    return {
        modules: {
            authComponent
        },
        commands: {
            selectAuthComponent,
            handleSignInWithProvider
        }
    }
}