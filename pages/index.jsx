// * react/next
import { useState } from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image'

// * redux
import {useDispatch} from 'react-redux'
import { clearError, signInWithProvider } from 'store/authSlice';

// * icons
import {FcGoogle} from 'react-icons/fc'

// * components
import Login from 'components/auth/Login';
import Register from 'components/auth/Register';
import ResetPassword from 'components/auth/ResetPassword';

export default function Home() {
	const [authComponent, setAuthComponent] = useState('Login')

	const router = useRouter()

	const dispatch = useDispatch()

	const selectAuthComponent = (type) => {
		setAuthComponent(type)
		dispatch(clearError())
	}
	const {asPath} = router

	return (
		<div className='h-screen w-full overflow-hidden relative bg-[#f8f8f8]'>
			<div className='absolute right-[-300px] bottom-[-400px] opacity-30 z-10'>
				<Image
					src="/carbon_chat-bot.svg" 
					alt="Vercel Logo" 
					width={965} 
					height={965} 
				/>
			</div>
			<div className='xl:flex-row flex flex-col items-center justify-center h-full w-full p-10 xl:gap-[16rem] gap-2'>
				<div className='max-w-[500px] text-[#273345] 2xl:max-w-[600px]'>
					<div className='flex items-center text-5xl font-bold mb-4'>
						<Image src="/carbon_chat-bot.svg" alt="Vercel Logo" width={125} height={125} />
						<span className='mt-7'>
							Intercourse
						</span>
					</div>
					<h3 className='xl:block hidden text-6xl font-bold'>
						Stay always in touch with your friends and loved ones
					</h3>
				</div>
				<div className='z-50'>
					<div className='flex flex-col items-center justify-center gap-6 max-w-[512px] max-h-[636px] bg-[#273345] rounded-2xl bg-opacity-70 backdrop-blur-sm shadow-md px-16 py-10 '>
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
			</div>
		</div>
	)
}
