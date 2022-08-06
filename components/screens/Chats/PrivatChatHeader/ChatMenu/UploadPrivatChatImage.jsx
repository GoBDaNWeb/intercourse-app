// * hooks
import {useChatMenu} from './useChatMenu'

// * icons
import {AiFillCamera} from 'react-icons/ai'

export default function UploadPrivatChatImage({ size, text_size}) {
	const {
        models: {
            chatImage,
			chatTitle,
			uploading
        },
        commands: {
            uploadAvatar
        }
    } = useChatMenu()

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