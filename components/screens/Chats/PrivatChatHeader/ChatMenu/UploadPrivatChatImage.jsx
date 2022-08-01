// * react/next
import { useState, useEffect, useContext } from 'react'
import {useRouter} from 'next/router'
import PrivatChatContext from 'context/PrivatChat/PrivatChatContext'

// * supabase
import { supabase } from 'supabase/supabaseClient'
import { updatePrivateChatImage } from 'supabase/modules/chat';

// * icons
import {AiFillCamera} from 'react-icons/ai'

export default function UploadPrivatChatImage({ url, size, onUpload, text_size}) {
	const [uploading, setUploading] = useState(false)
	const [chatImage, setChatImage] = useState(null)
	const [chatTitle, setChatTitle] = useState(null)

    const router = useRouter()
	const {privatChatData} = useContext(PrivatChatContext)

	useEffect(() => {
		setChatImage(privatChatData.image)
		setChatTitle(privatChatData.chat_title)
	}, [])

	// ** функция загрузки аватара 
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

			let { error: uploadError } = await supabase.storage
			.from('image-privat-chats')
			.upload(filePath, file)

			if (uploadError) {
			    throw uploadError
			}

			onUpload(filePath)
			updatePrivateChatImage(router.query.id, filePath)
		} catch (error) {
			console.log(error.message)
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
		{
			chatImage 
			? (
				<img
					src={`https://bxnclqtavxncwdogrurd.supabase.co/storage/v1/object/public/image-privat-chats/${chatImage}`}
					alt="chatImage"
					className="rounded-full"
					style={{ height: size, width: size }}
				/>
			) : (
				<div className={`absolute group-hover:opacity-0 opacity-100 transition text-white text-${text_size}`}>
					{ chatTitle !== null && 
						chatTitle[0].toUpperCase()
					}
				</div>
			)
		}
		<div className="absolute text-white text-5xl flex flex-col justify-center items-center group-hover:opacity-100 opacity-0 transition cursor-pointer bg-black bg-opacity-20 w-full h-full rounded-full">
			<AiFillCamera/>
			<h4 className='text-sm'>
				upload photo
			</h4>
		</div>
		{
			uploading 
			? (
				<h4 className='absolute flex flex-col justify-center items-center text-lg bg-black bg-opacity-20 w-full h-full rounded-full transition'>
					uploading ...
				</h4>
			) : null
		}
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