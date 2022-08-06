// * react/next
import { useState, useCallback } from 'react';

// * redux
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from 'store/authSlice';


export function useRegister() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [loader, setLoader] = useState(false)

    const dispatch = useDispatch()

    const {error} = useSelector(state => state.auth)
    // ** функция в зависимости от переданного типа следит за изменениями value
    const onChange = useCallback(e => {
        const {value} = e.target
        const {name} = e.target
        if (name === 'username') {
            setUsername(value)
        }
        if (name === 'email') {
            setEmail(value)
        }
        if (name === 'password') {
            setPassword(value)
        }
        if (name === 'confirm') {
            setConfirm(value)
        }
    }, [])

    // ** мотирует элемент loader
    const isLoader = () => {
        setLoader(true)
    }

    const register = () => {
        dispatch(signUp({username, email, password, confirm}))
        isLoader()
    }

    return {
        models: {
            username,
            email,
            password,
            confirm,
            loader,
            error
        },
        commands: {
            onChange,
            register
        }
    }
}