// * react/next
import { useState, useEffect, useCallback } from 'react'
import {useRouter} from 'next/router'

// * redux
import {useSelector, useDispatch} from 'react-redux'
import {setOpenMenuPrivatChatHeader} from 'store/chatSlice'

// * supabase
import {supabase} from 'supabase/supabaseClient'
import {updatePrivateChatImage} from 'supabase/modules/chat'

export function useChatMenu() {
    const [image_url, setImageUrl] = useState(null)
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
	const [chatImage, setChatImage] = useState(null)
	const [chatTitle, setChatTitle] = useState(null)

    const router = useRouter()
    const dispatch = useDispatch()

    const {isOpenMenuPrivatChatHeader, privatChatData} = useSelector(state => state.chat)

	useEffect(() => {
		setChatImage(privatChatData.image)
		setChatTitle(privatChatData.chat_title)
	}, [privatChatData])

    const handleOpenMenu = () => {
        dispatch(setOpenMenuPrivatChatHeader(false))
    }

    const uploadImage = useCallback((url) => {
        setImageUrl(url)
        updatePivatChat({image_url: url})
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

			uploadImage(filePath)
			updatePrivateChatImage(router.query.id, filePath)
		} catch (error) {
			console.log(error.message)
		} finally {
			setUploading(false)
		}
	}

    async function updatePivatChat({ image_url }) {
        try {
            setLoading(true)
            const user = supabase.auth.user()
    
            const updates = {
                id: router.query.id,
                image: image_url
            }
    
            let { error } = await supabase.from('privat_chats').upsert(updates, {
            returning: 'minimal', // Don't return the value after inserting
            })
    
            if (error) {
            throw error
            }
        } catch (error) {
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }

    return {
        models: {
            image_url,
            uploading,
            chatImage,
            chatTitle,
            privatChatData,
            isOpenMenuPrivatChatHeader
        },
        commands: {
            uploadAvatar,
            updatePivatChat,
            handleOpenMenu,
        }
    }
}