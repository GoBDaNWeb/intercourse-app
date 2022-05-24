// * react/next
import { useState } from 'react';
import {useTranslation} from 'next-i18next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'

// * redux
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from 'store/authSlice';

// * framer-motion
import { motion } from 'framer-motion';

// * components
import { ThreeDots } from 'react-loader-spinner';

export async function getStaticProps({locale}) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['front'])),
        }
    }
}

export default function Register({selectAuthComponent}) {
    const {t} = useTranslation()

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
            <h2 className='text-center text-3xl font-bold text-gray-200 mb-6'>
                {t('front.create-title')}
            </h2>
            <div className='flex flex-col items-center justify-center gap-3 '>
                <div className='flex flex-col items-center'>
                    <input 
                        onChange={(e) => onChange(e, 'username')}
                        value={username}
                        className='w-96 h-10 rounded-2xl p-2 outline-none'
                        type="text" 
                        placeholder={t('front.enter-username')}
                    />
                    {
                        username.length < 3
                        && <h4 className='text-sm text-center text-gray-200'>{t('front.username-hint')}</h4>
                    }
                </div>
                <input 
                    onChange={(e) => onChange(e, 'email')}
                    value={email}
                    className='w-96 h-10 rounded-2xl p-2 outline-none'
                    type="email" 
                    placeholder={t('front.enter-email')}
                />
                <div>
                    <input 
                        onChange={(e) => onChange(e, 'password')}
                        value={password}
                        className={`w-96 h-10 rounded-2xl p-2 outline-none ${error ? 'border-2 border-red-500' : ''}`}
                        type="password" 
                        placeholder={t('front.enter-password')}
                    />
                    {
                        password.length < 6 
                        && <h4 className='text-sm text-center text-gray-200'>{t('front.password-hint')}</h4>
                    }
                </div>
                <div>
                    <input 
                        onChange={(e) => onChange(e, 'confirm')}
                        value={confirm}
                        className={`w-96 h-10 rounded-2xl p-2 outline-none ${error ? 'border-2 border-red-500' : ''}`}
                        type="password"
                        placeholder={t('front.confirm-password')}
                    />
                    {
                        error
                        && <h4 className='text-sm text-center text-red-500'>{t('front.password-error')}</h4>
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
                        {t('front.sign-up')}
                    </motion.button>
                }
                {loader && <ThreeDots color="#22C55E"/>}
            </div>
            <div>
                <h3 
                    onClick={() => selectAuthComponent('Login')}
                    className='underline cursor-pointer transition text-green-400 hover:text-green-500'
                >
                    {t('front.login-link')}
                </h3>
            </div>
        </div>
    )
}