// * react/next
import { useState } from 'react';

// * redux
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from 'store/authSlice';

// * framer-motion
import { motion } from 'framer-motion';

// * components
import { ThreeDots } from 'react-loader-spinner';

export default function Register({selectAuthComponent}) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [loader, setLoader] = useState(false)

    const dispatch = useDispatch()

    const {error} = useSelector(state => state.auth)

    // ** функция в зависимости от переданного типа следит за изменениями value
    const onChange = (e, type) => {
        const {value} = e.target
        if (type === 'username') {
            setUsername(value)
        }
        if (type === 'email') {
            setEmail(value)
        }
        if (type === 'password') {
            setPassword(value)
        }
        if (type === 'confirm') {
            setConfirm(value)
        }
    }

    // ** мотирует элемент loader
    const isLoader = () => {
        setLoader(true)
    }

    // ** при появлении ошибок размонтирует элемент loader

    const signUpFunc = () => {
        dispatch(signUp({username, email, password, confirm}))
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <h2 className='text-center text-lg sm:text-3xl font-bold text-gray-200 mb-6'>
                create new account
            </h2>
            <div className='flex flex-col items-center justify-center gap-3 '>
                <div className='flex flex-col items-center'>
                    <input 
                        onChange={(e) => onChange(e, 'username')}
                        value={username}
                        className='sm:w-96 w-60 h-10 rounded-2xl p-2 outline-none'
                        type="text" 
                        placeholder='Enter your username'
                    />
                    {
                        username.length < 3
                        && <h4 className='text-sm text-center text-gray-200'>username must be 3 symbol length or more</h4>
                    }
                </div>
                <input 
                    onChange={(e) => onChange(e, 'email')}
                    value={email}
                    className='sm:w-96 w-60 h-10 rounded-2xl p-2 outline-none'
                    type="email" 
                    placeholder='Enter your email'
                />
                <div>
                    <input 
                        onChange={(e) => onChange(e, 'password')}
                        value={password}
                        className={`sm:w-96 w-60 h-10 rounded-2xl p-2 outline-none ${error ? 'border-2 border-red-500' : ''}`}
                        type="password" 
                        placeholder='Enter your password'
                    />
                    {
                        password.length < 6 
                        && <h4 className='text-sm text-center text-gray-200'>password must be 6 symbol length or more</h4>
                    }
                </div>
                <div>
                    <input 
                        onChange={(e) => onChange(e, 'confirm')}
                        value={confirm}
                        className={`sm:w-96 w-60 h-10 rounded-2xl p-2 outline-none ${error ? 'border-2 border-red-500' : ''}`}
                        type="password"
                        placeholder='Confirm your password'
                    />
                    {
                        error
                        && <h4 className='text-sm text-center text-red-500'>passwords dont match</h4>
                    }
                </div>
                {
                    !loader
                    &&
                    <motion.button 
                        disabled={username.length < 3 || email.length < 5 || password.length < 6}
                        onClick={() => {
                            signUpFunc(username, email, password, confirm)
                            isLoader()
                            
                        }}
                        className='bg-white px-8 h-10 rounded-2xl font-bold disabled:opacity-50 disabled:pointer-events-none'
                        whileHover={{
                            scale: 1.05
                        }}
                        whileTap={{
                            scale: 0.95
                        }}
                        >
                        Sign Up
                    </motion.button>
                }
                {loader && <ThreeDots color="#22C55E"/>}
            </div>
            <div>
                <h3 
                    onClick={() => selectAuthComponent('Login')}
                    className='underline cursor-pointer transition text-green-400 hover:text-green-500'
                >
                    You already have an account?
                </h3>
            </div>
        </div>
    )
}