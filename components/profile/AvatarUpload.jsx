import { useEffect, useState } from 'react'
import { supabase } from 'utils/supabaseClient'
import {AiFillCamera} from 'react-icons/ai'
import {useSelector, useDispatch} from 'react-redux'
import { updateUserAvatar } from 'utils/Store';
import {setAvatar} from 'store/profileSlice'

export default function Avatar({ url, size, onUpload }) {
	const [avatarUrl, setAvatarUrl] = useState(null)
	const [uploading, setUploading] = useState(false)

	const {user} = useSelector(state => state.auth)
	const {avatar} = useSelector(state => state.profile)

	const dispatch = useDispatch()
	console.log(avatar)

	async function uploadAvatar(event) {
		try {
			setUploading(true)
				if (!event.target.files || event.target.files.length === 0) {
				throw new Error('You must select an image to upload.')
			}

			const file = event.target.files[0]
			const fileExt = file.name.split('.').pop()
			const fileName = `${Math.random()}.${fileExt}`
			const filePath = `${fileName}`

			localStorage.setItem('avatar', filePath)

			let { error: uploadError } = await supabase.storage
			.from('avatars')
			.upload(filePath, file)

			if (uploadError) {
			throw uploadError
			}

			onUpload(filePath)
			updateUserAvatar(user.id, filePath)
			setAvatar(filePath)
		} catch (error) {
			alert(error.message)
		} finally {
			setUploading(false)
		}
	}

  return (
    <label 
	className='relative flex justify-center items-center text-8xl font-bold text-accent grad-1 rounded-full group cursor-pointer'
	htmlFor="single"
	style={{ height: size, width: size }}
	>
      {avatar ? (
        <img
          src={`https://bxnclqtavxncwdogrurd.supabase.co/storage/v1/object/public/avatars/${avatar}`}
          alt="Avatar"
          className="rounded-full"
          style={{ height: size, width: size }}
        />
      ) : (
        <div className='absolute group-hover:opacity-0 opacity-100 transition text-white'>
			{ user !== null && 
				user.user_metadata.name
				? user !== null && user.user_metadata.name[0].toUpperCase()
				: user !== null && user.user_metadata.username[0].toUpperCase()
			}
		</div>
      )}
			<div className="absolute text-white flex flex-col justify-center items-center group-hover:opacity-100 opacity-0 transition cursor-pointer bg-black bg-opacity-20 w-full h-full rounded-full">
				<AiFillCamera/>
				<h4 className='text-sm'>
					upload photo
				</h4>
			</div>
			{uploading ? 
				<h4 className='absolute flex flex-col justify-center items-center text-lg bg-black bg-opacity-20 w-full h-full rounded-full transition'>
					uploading ...
				</h4> 
			: ''}
			<input
			style={{
				visibility: 'hidden',
				position: 'absolute',
			}}
			type="file"
			id="single"
			accept="image/*"
			onChange={uploadAvatar}
			disabled={uploading}
			/>
    </label>
  )
}