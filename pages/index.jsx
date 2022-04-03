import Image from 'next/image'
import {FcGoogle} from 'react-icons/fc'
import {FaApple} from 'react-icons/fa'
import { useState } from 'react'
import Login from 'components/Login/Register/Login';
import Register from 'components/Login/Register/Register';

export default function Home() {
	const [isLogin, setIsLogin] = useState(true)
	const [isRegister, setIsRegister] = useState(false)

	const handleRegister = () => {
		if (isLogin === true) {
			setIsLogin(false)
			setIsRegister(true)
		}
		if (isRegister === true) {
			setIsLogin(true)
			setIsRegister(false)
		}
	}

	return (
		<div className='h-screen w-full overflow-hidden relative'>
			<div className='absolute right-[-300px] bottom-[-400px] opacity-30 z-10'>
				<Image
					src="/carbon_chat-bot.svg" 
					alt="Vercel Logo" 
					width={965} 
					height={965} 
				/>
			</div>
			<div className='flex items-center justify-center h-full w-full p-10 gap-[16rem]'>
				<div className='max-w-[500px] text-[#273345]'>
					<div className='flex items-center text-5xl font-bold mb-4'>
						<Image src="/carbon_chat-bot.svg" alt="Vercel Logo" width={125} height={125} />
						<span className='mt-7'>
							Intercourse
						</span>
					</div>
					<h3 className='text-6xl font-bold'>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit.
					</h3>
				</div>
				<div className='z-50'>
					<div className='flex flex-col items-center justify-center gap-6 max-w-[790px] max-h-[636px] bg-[#273345] rounded-2xl bg-opacity-70 backdrop-blur-sm shadow-md px-16 py-10'>
						{
							isLogin 
							? <Login handleRegister={handleRegister}/> 
							: <Register handleRegister={handleRegister}/>
						}
						<div className='flex items-center justify-center gap-4 text-5xl'>
							<button className='cursor-pointer'>
								<FcGoogle/>
							</button>	
							<button className='cursor-pointer'>
								<FaApple/>
							</button>	
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
