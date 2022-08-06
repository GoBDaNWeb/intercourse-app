// * react/next 
import {memo} from 'react'

// * hooks 
import {useRegister} from './useRegister'

// * framer-motion
import { motion } from 'framer-motion';

// * components
import { ThreeDots } from 'react-loader-spinner';
 
export default memo(function RegisterFields() {
    const {
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
    } = useRegister()

    return (
        <div className='flex flex-col items-center justify-center gap-3 '>
            <div className='flex flex-col items-center'>
                <input 
                    onChange={onChange}
                    value={username}
                    className='sm:w-96 w-60 h-10 rounded-2xl p-2 outline-none'
                    type="text" 
                    name='username'
                    placeholder='Enter your username'
                />
                {username}
                {
                    username.length < 3
                    && (<h4 className='text-sm text-center text-gray-200'>username must be 3 symbol length or more</h4>)
                }
            </div>
            <input 
                onChange={onChange}
                value={email}
                className='sm:w-96 w-60 h-10 rounded-2xl p-2 outline-none'
                type="email" 
                name='email'
                placeholder='Enter your email'
            />
            {email}
            <>
                <input 
                    onChange={onChange}
                    value={password}
                    className={`sm:w-96 w-60 h-10 rounded-2xl p-2 outline-none ${error ? 'border-2 border-red-500' : ''}`}
                    type="password"
                    name='password'
                    placeholder='Enter your password'
                />
                {password}
                {
                    password.length < 6 
                    && (<h4 className='text-sm text-center text-gray-200'>password must be 6 symbol length or more</h4>)
                }
            </>
            <>
                <input 
                    onChange={onChange}
                    value={confirm}
                    className={`sm:w-96 w-60 h-10 rounded-2xl p-2 outline-none ${error ? 'border-2 border-red-500' : ''}`}
                    type="password"
                    name='confirm'
                    placeholder='Confirm your password'
                />
                {confirm}
                {
                    error
                    && (<h4 className='text-sm text-center text-red-500'>passwords dont match</h4>)
                }
            </>
            {
                !loader
                && (
                    <motion.button 
                        disabled={username.length < 3 || email.length < 5 || password.length < 6}
                        onClick={register}
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
                    
                )
            }
            {loader && <ThreeDots color="#22C55E"/>}
        </div>
    )
})