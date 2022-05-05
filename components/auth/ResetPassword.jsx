import {useState} from 'react'
import {resetPassword} from 'utils/Store'

export default function ResetPassword({selectAuthComponent}) {
    const [email, setEmail] = useState('')

    const onChange = (e) => {
        const {value} = e.target
        setEmail(value)
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <h2 className='text-center text-lg font-semibold text-gray-200 mb-6'>Enter your email <br/> to change your password </h2>
            <div className='flex flex-col items-center justify-center gap-3 '>
                <input 
                    onChange={e => onChange(e)}
                    // value={email}
                    className='w-96 h-10 rounded-2xl p-2 outline-none'
                    type="email" 
                    placeholder='Enter your email'
                />
                {/* {loader && <ThreeDots color="#22C55E"/>} */}
                <button
                    onClick={() => resetPassword(email)}
                >
                    resetPassword
                </button>
            </div>
            <div className='flex gap-2'>
                <h3 
                    onClick={() => selectAuthComponent('Login')}
                    className='underline cursor-pointer transition text-green-400 hover:text-green-500'
                >
                    Login
                </h3>
                |
                <h3
                    onClick={() => selectAuthComponent('Register')}
                    className='underline cursor-pointer transition text-green-400 hover:text-green-500'
                >
                    Register
                </h3>
            </div>
        </div>
    )
}