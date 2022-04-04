import AppProvider from 'context/AppProvider';
import { useState,useContext } from 'react';
import UserContext from './../../../context/UserContext';

export default function Register({handleRegister}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')

    const onChangeEmail = e => {
        const {value} = e.target
        setEmail(value)
    }
    const onChangePassword = e => {
        const {value} = e.target
        setPassword(value)
    }
    const onChangeConfirm = e => {
        const {value} = e.target
        setConfirm(value)
    }

    const {signUp, wrongPassword} = useContext(UserContext);

    return (
        <div className="flex flex-col items-center gap-4">
            <h2 className='text-center  text-3xl font-bold text-gray-100 mb-6'>create new account</h2>
            <div className='flex flex-col items-center justify-center gap-3 '>
                <input 
                    onChange={(e) => onChangeEmail(e)}
                    value={email}
                    className='w-96 h-10 rounded-2xl p-2 outline-none'
                    type="email" 
                    placeholder='Enter your Email'
                />
                <div>
                    <input 
                        onChange={(e) => onChangePassword(e)}
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
                        onChange={(e) => onChangeConfirm(e)}
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
                <button 
                    disabled={email.length < 5 || password.length < 6}
                    onClick={() => signUp(email, password, confirm)}
                    className='bg-white w-36 h-10 rounded-2xl font-bold disabled:opacity-50'>
                    Sign Up
                </button>
            </div>
            <div>
                <h3 
                    onClick={() => handleRegister()}
                    className='underline cursor-pointer transition text-green-400 hover:text-green-500'
                >
                    Dont have account?
                </h3>
            </div>
        </div>
    )
}