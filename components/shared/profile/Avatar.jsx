// * redux
import {useSelector} from 'react-redux'

export default function Avatar({ size, children }) {
	const {user, avatar} = useSelector(state => state.auth)
	const username = user?.user_metadata.name ? user?.user_metadata.name[0].toUpperCase() : user?.user_metadata.username[0].toUpperCase()
return (
	<div 
	className='relative flex justify-center text-8xl font-bold text-accent items-center grad-1 rounded-full group'
	style={{ height: size, width: size }}
	>
		{avatar ? (
		<img
			src={`https://bxnclqtavxncwdogrurd.supabase.co/storage/v1/object/public/avatars/${avatar}`}
			className="rounded-full"
			style={{ height: size, width: size }}
		/>
		) : (
		<div className='absolute text-3xl transition text-white'>
			{username}
		</div>
		)}
		{children}
	</div>
	)
}