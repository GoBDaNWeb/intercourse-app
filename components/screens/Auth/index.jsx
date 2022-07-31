// * react/next
import Image from 'next/image'

// * components
import AuthPanel from './AuthPanel';

export default function Auth() {
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
					<div className='flex flex-col sm:flex-row items-center text-5xl font-bold mb-4'>
						<Image src="/carbon_chat-bot.svg" alt="Vercel Logo" width={125} height={125} />
						<span className='mt-7'>
							Intercourse
						</span>
					</div>
					<h3 className='xl:block hidden text-6xl font-bold'>
						Stay always in touch with your friends and loved ones
					</h3>
				</div>
				<AuthPanel/>
			</div>
		</div>
	)
}
