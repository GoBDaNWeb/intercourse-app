// * react/next 
import {memo} from 'react'

// * hooks 
import {useLogin} from './useLogin'

// * framer-motion 
import {motion} from 'framer-motion'

// * components
import { ThreeDots } from 'react-loader-spinner';
 

export default memo(function LoginFields() {
    const {
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
    } = useLogin()

    return (
        <div className='flex flex-col items-center justify-center gap-3 '>
            <input 
                onChange={e => onChange(e, 'email')}
                value={email}
                className='sm:w-96 w-60 h-10 rounded-2xl p-2 outline-none'
                type="email" 
                name='email'
                placeholder='Enter your email'
            />
            <input 
                onChange={e => onChange(e, 'password')}
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
                    !loader 
                    && <motion.button 
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
                }
                {loader && <ThreeDots color="#22C55E"/>}
            </>   
        </div>
    )
})