// * react/next
import { useState} from 'react'
import {useRouter} from 'next/router'

// * supabase
import {supabase} from 'supabase/supabaseClient'
import {updateGroupChatImage, updatePrivateChatImage, fetchOnePrivatChat, fetchOneGroupChat} from 'supabase/modules/chat'

export function useUploadChatImage(isPrivatChat, id) {
    const [uploading, setUploading] = useState(false)

    const router = useRouter()

	const fetchPrivateChat = async () => {
		const response = await fetchOnePrivatChat(id)
		console.log(response)
	}

	const fetchGroupChat = async () => {
		const response = await fetchOneGroupChat(id)
		console.log(response)
	}

	async function uploadImage(event) {
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
                .from(isPrivatChat ? 'image-privat-chats' : 'image-group-chats')
                .upload(filePath, file)

			if (uploadError) {
			    throw uploadError
			}

            if (isPrivatChat) {
				updatePrivateChatImage(router.query.id, filePath)
				fetchPrivateChat()
            } else {
                updateGroupChatImage(router.query.id, filePath)
				fetchGroupChat()
            }
		} catch (error) {
			console.log(error.message)
		} finally {
			setUploading(false)
		}
	}

    return {uploading, uploadImage}
}