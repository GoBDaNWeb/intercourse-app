import { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'


export default function Avatar({ url, size, children }) {
	const {user} = useSelector(state => state.auth)
	const {avatar} = useSelector(state => state.profile)

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
			{ user !== null && 
				user.user_metadata.name
				? user !== null && user.user_metadata.name[0].toUpperCase()
				: user !== null && user.user_metadata.username[0].toUpperCase()
			}
		</div>
		)}
		{children}
	</div>
	)
}