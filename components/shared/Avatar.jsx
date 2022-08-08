import Image from 'next/image'

const Avatar = ({avatar, username, size, text_size, children }) => {
	return (
		<div 
			className='relative flex justify-center text-8xl font-bold text-accent items-center grad-1 rounded-full group'
			style={{ height: size, width: size }}
		>
			{
				avatar 
				? (
					<Image
						src={`https://bxnclqtavxncwdogrurd.supabase.co/storage/v1/object/public/avatars/${avatar}`}
						className="rounded-full"
						height={size}
						width={size}
					/>
				) : (
					<div className={`absolute text-3xl transition text-white text-${text_size}`}>
						{username && username[0].toUpperCase()}
					</div>
				)
			}
			{children}
		</div>
	)
}

export default Avatar