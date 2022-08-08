// * react/next
import { memo, useState, useEffect, useCallback } from 'react';

// * redux
import { useDispatch, useSelector } from 'react-redux';
import { signIn, clearError } from 'store/authSlice';

// * framer-motion 
import {motion} from 'framer-motion'

// * components
import { ThreeDots } from 'react-loader-spinner';


const LoginFields = memo(() => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loader, setLoader] = useState(false)
    const [empty, setEmpty] = useState(false)
    
    const {error} = useSelector(state => state.auth)

    const dispatch = useDispatch()

     const signInFunc = () => {
        dispatch(signIn({email, password}))
        if (error) {
            dispatch(clearError())
        }
    }

    const onChange = useCallback((e) => {
        const {value} = e.target
        const {name} = e.target
        if (name === 'email') {
            setEmail(value)
            if(error) {
                dispatch(clearError())
            }
            if (empty) {
                setEmpty(false)
            }
        }
        if (name === 'password') {
            setPassword(value)
            if(error) {
                dispatch(clearError())
            }
            if (empty) {
                setEmpty(false)
            }
        }
    }, [])

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

    useEffect(() => {
        setLoader(false)
    }, [error])

    return (
        <div className='flex flex-col items-center justify-center gap-3 '>
            <input 
                onChange={onChange}
                value={email}
                className='sm:w-96 w-60 h-10 rounded-2xl p-2 outline-none'
                type="email" 
                name='email'
                placeholder='Enter your email'
            />
            <input 
                onChange={onChange}
                value={password}
                className='sm:w-96 w-60 h-10 rounded-2xl p-2 outline-none'
                type="password"
                name='password'
                placeholder='Enter your password'
            />
            <>
                {
                    error && email.length > 0 && password.length > 0 && 
                    <h4 className='text-red-500'>
                        {error}
                    </h4>
                }
                {
                    empty && 
                    <h4 className='text-red-500'>
                        Invalid login credentials
                    </h4>
                }
                {
                    loader 
                    ? (
                        <ThreeDots color="#22C55E"/>
                    ) : (
                        <motion.button 
                            onClick={login}
                            className='bg-white w-36 h-10 rounded-2xl font-semibold'
                            whileHover={{
                                scale: 1.05
                            }}
                            whileTap={{
                                scale: 0.95
                            }}
                        >
                            Sign In
                        </motion.button>
                    )
                }
            </>   
        </div>
    )
})

LoginFields.displayName = 'LoginFields';

export default LoginFields 