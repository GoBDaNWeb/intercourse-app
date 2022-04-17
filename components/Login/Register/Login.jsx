import { useContext, useState, useEffect } from 'react';
import UserContext from './../../../context/UserContext';
import Loader from './../../Loader';
import { motion } from 'framer-motion';

export default function Login({handleRegister}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loader, setLoader] = useState(false)
    const [empty, setEmpty] = useState(false)

    const {signIn, error, setError, user} = useContext(UserContext)

    // ** функция в зависимости от переданного типа следит за изменениями value
    const onChange = (e, type) => {
        const {value} = e.target
        if (type === 'email') {
            setEmail(value)
            if(error) {
                setError(null)
            }
            if (empty) {
                setEmpty(false)
            }
        }
        if (type === 'password') {
            setPassword(value)
            if(error) {
                setError(null)
            }
            if (empty) {
                setEmpty(false)
            }
        }
    }

    // ** функция монтирует элемент loader
    const isLoader = () => {
        setLoader(true)
    }

    // ** следит чтобы значения в полях email/password не были пустыми
    const isEmpty = () => {
        if (!email.length && !password.length) {
            setEmpty(true)
        }
    }

    // ** при появлении ошибок размонтирует элемент loader
    useEffect(() => {
        setLoader(false)
    }, [error])

    return (
        <div className="flex flex-col items-center gap-4">
            <h2 className='text-center  text-3xl font-semibold text-gray-100 mb-6'>Login in to your account</h2>
            <div className='flex flex-col items-center justify-center gap-3 '>
                <input 
                    onChange={e => onChange(e, 'email')}
                    value={email}
                    className='w-96 h-10 rounded-2xl p-2 outline-none'
                    type="email" 
                    placeholder='Enter your email'
                />
                <input 
                    onChange={e => onChange(e, 'password')}
                    value={password}
                    className='w-96 h-10 rounded-2xl p-2 outline-none'
                    type="password" 
                    placeholder='Enter your password'
                />
                {
                    error && email.length > 0 && password.length > 0 && 
                    <h4 className='text-red-500'>
                        {error.message}
                    </h4>
                }
                {
                    empty && 
                    <h4 className='text-red-500'>
                        Invalid login credentials
                    </h4>
                }
                {
                    !loader 
                    && <motion.button 
                            onClick={() => {
                                signIn(email, password)
                                isLoader()
                                isEmpty()
                            }}
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
                }
                {loader && <Loader/>}
            </div>
            <div className='flex gap-2'>
                <h3 
                    onClick={() => handleRegister()}
                    className='underline cursor-pointer transition text-green-400 hover:text-green-500'
                >
                    Dont have account?
                </h3>
                |
                <h3
                    className='underline cursor-pointer transition text-green-400 hover:text-green-500'
                >
                    Forgot password?
                </h3>
            </div>
        </div>
    )
}