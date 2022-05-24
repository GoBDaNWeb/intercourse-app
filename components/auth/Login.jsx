// * react/next
import { useState, useEffect } from 'react';
import {useTranslation} from 'next-i18next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'

// * redux
import {useDispatch, useSelector} from 'react-redux'
import { signIn, clearError } from 'store/authSlice';

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

export default function Login({selectAuthComponent}) {
    const {t} = useTranslation()

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
        if (type === 'email') {
            setEmail(value)
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
            <h2 className='text-center text-3xl font-semibold text-gray-200 mb-6'>
                {t('front.login-title')}
            </h2>
            <div className='flex flex-col items-center justify-center gap-3 '>
                <input 
                    onChange={e => onChange(e, 'email')}
                    value={email}
                    className='w-96 h-10 rounded-2xl p-2 outline-none'
                    type="email" 
                    placeholder={t('front.enter-email')}
                />
                <input 
                    onChange={e => onChange(e, 'password')}
                    value={password}
                    className='w-96 h-10 rounded-2xl p-2 outline-none'
                    type="password" 
                    placeholder={t('front.enter-password')}
                />
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
                    !loader 
                    && <motion.button 
                            onClick={() => {
                                signInFunc(email, password)
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
                            {t('front.sign-in')}
                        </motion.button>
                }
                {loader && <ThreeDots color="#22C55E"/>}
            </div>
            <div className='flex gap-2'>
                <h3 
                    onClick={() => selectAuthComponent('Register')}
                    className='underline cursor-pointer transition text-green-400 hover:text-green-500'
                >
                    {t('front.create-account-link')}
                </h3>
            </div>
        </div>
    )
}