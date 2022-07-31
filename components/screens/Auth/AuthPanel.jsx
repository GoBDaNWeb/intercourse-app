// * react/next
import { useState } from 'react'

// * redux
import {useDispatch} from 'react-redux'
import { clearError, signInWithProvider } from 'store/authSlice';

// * icons
import {FcGoogle} from 'react-icons/fc'

// * components
import Login from './Login/index';
import Register from './Register/index';


export default function AuthPanel() {
    const [authComponent, setAuthComponent] = useState('Login')

	const dispatch = useDispatch()

	const selectAuthComponent = (type) => {
		setAuthComponent(type)
		dispatch(clearError())
	}

    return (
        <div className='z-50'>
            <div className='flex flex-col items-center justify-center gap-6 max-w-[280px] sm:max-w-[512px] max-h-[636px] bg-[#273345] rounded-2xl bg-opacity-70 backdrop-blur-sm shadow-md px-16 py-10'>
                {
                    authComponent === 'Login'
                    && 
                    <Login selectAuthComponent={selectAuthComponent}/> 
                }
                {
                    authComponent === 'Register'
                    &&
                    <Register selectAuthComponent={selectAuthComponent}/>
                }
                {
                    authComponent === 'ResetPassword'
                    &&
                    <ResetPassword selectAuthComponent={selectAuthComponent}/>
                }
                <div className='flex items-center justify-center gap-4 text-5xl'>
                    <button 
                        onClick={() => dispatch(signInWithProvider('google'))}
                        className='cursor-pointer'
                    >
                        <FcGoogle/>
                    </button>		
                </div>
            </div>
        </div>
    )
}