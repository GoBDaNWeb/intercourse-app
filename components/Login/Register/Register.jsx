import AppProvider from 'context/AppProvider';
import { useState,useContext,useEffect } from 'react';
import UserContext from './../../../context/UserContext';
import { motion } from 'framer-motion';

export default function Register({handleRegister}) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [loader, setLoader] = useState(false)

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
    useEffect(() => {
        setLoader(false)
    }, [wrongPassword])

    const {signUp, wrongPassword} = useContext(UserContext);

    return (
        <div className="flex flex-col items-center gap-4">
            <h2 className='text-center  text-3xl font-bold text-gray-100 mb-6'>create new account</h2>
            <div className='flex flex-col items-center justify-center gap-3 '>
                <div>
                    <input 
                        onChange={(e) => onChange(e, 'username')}
                        value={username}
                        className='w-96 h-10 rounded-2xl p-2 outline-none'
                        type="text" 
                        placeholder='Enter your username'
                    />
                    {
                        username.length < 3
                        && <h4 className='text-sm text-center text-gray-400'>username must be 3 symbol length or more</h4>
                    }
                </div>
                <input 
                    onChange={(e) => onChange(e, 'email')}
                    value={email}
                    className='w-96 h-10 rounded-2xl p-2 outline-none'
                    type="email" 
                    placeholder='Enter your email'
                />
                <div>
                    <input 
                        onChange={(e) => onChange(e, 'password')}
                        value={password}
                        className={`w-96 h-10 rounded-2xl p-2 outline-none ${wrongPassword ? 'border-2 border-red-500' : ''}`}
                        type="password" 
                        placeholder='Enter your password'
                    />
                    {
                        password.length < 6 
                        && <h4 className='text-sm text-center text-gray-400'>password must be 6 symbol length or more</h4>
                    }
                </div>
                <div>
                    <input 
                        onChange={(e) => onChange(e, 'confirm')}
                        value={confirm}
                        className={`w-96 h-10 rounded-2xl p-2 outline-none ${wrongPassword ? 'border-2 border-red-500' : ''}`}
                        type="password"
                        placeholder='Confirm your password'
                    />
                    {
                        wrongPassword
                        && <h4 className='text-sm text-center text-gray-400'>passwords dont match</h4>
                    }
                </div>
                <motion.button 
                    disabled={username.length < 3 || email.length < 5 || password.length < 6}
                    onClick={() => {
                        signUp(username, email, password, confirm)
                        isLoader()
                        
                    }}
                    className='bg-white w-36 h-10 rounded-2xl font-bold disabled:opacity-50 disabled:pointer-events-none'
                    whileHover={{
                        scale: 1.05
                    }}
                    whileTap={{
                        scale: 0.95
                    }}
                    >
                    Sign Up
                </motion.button>
            </div>
            <div>
                <h3 
                    onClick={() => handleRegister()}
                    className='underline cursor-pointer transition text-green-400 hover:text-green-500'
                >
                    You already have an account?
                </h3>
            </div>
        </div>
    )
}