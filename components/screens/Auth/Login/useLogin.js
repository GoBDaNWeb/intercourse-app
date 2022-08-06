// * react/next
import { useState, useEffect, useCallback } from 'react';

// * redux
import { useDispatch, useSelector } from 'react-redux';
import { signIn, clearError } from 'store/authSlice';


export function useLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loader, setLoader] = useState(false)
    const [empty, setEmpty] = useState(false)
    
    const {error} = useSelector(state => state.auth)

    const dispatch = useDispatch()

     // ** функция логина пользователя
     const signInFunc = () => {
        if (error) {
            dispatch(clearError())
        }
        dispatch(signIn({email, password}))
    }

    // ** функция в зависимости от переданного типа следит за изменениями value
    const onChange = (e, type) => {
        const {value} = e.target
        const {name} = e.target
        if (type === 'email') {
            setEmail(value)
            console.log(email)
            if(error) {
                dispatch(clearError())
            }
            if (empty) {
                setEmpty(false)
            }
        }
        if (type === 'password') {
            setPassword(value)
            if(error) {
                dispatch(clearError())
            }
            if (empty) {
                setEmpty(false)
            }
        }
    }

    // ** следит чтобы значения в полях email/password не были пустыми
    const isEmpty = () => {
        if (!email.length && !password.length) {
            setEmpty(true)
        }
    }

    const login = () => {
        signInFunc(email, password)
        setLoader(true)
        isEmpty()
    }

    // ** при появлении ошибок размонтирует элемент loader
    useEffect(() => {
        setLoader(false)
    }, [error])

    return {
        models: {
            email,
            password,
            empty,
            loader,
            error
        },
        commands: {
            onChange,
            login
        }
    }
}