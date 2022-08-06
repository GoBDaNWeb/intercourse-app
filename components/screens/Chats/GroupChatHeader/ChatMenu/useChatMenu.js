// * react/next
import { useState} from 'react'
import {useRouter} from 'next/router'

// * redux 
import {useSelector, useDispatch} from 'react-redux'
import {setOpenMenuGroupChatHeader} from 'store/chatSlice'

// * supabase
import {supabase} from 'supabase/supabaseClient'
import {updateGroupChatImage} from 'supabase/modules/chat'


export function useChatMenu() {
    const [image_url, setImageUrl] = useState(null)
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)

    const router = useRouter()
    const dispatch = useDispatch()

    const {isTheirProfileOpen} = useSelector(state => state.profile)
    const {isOpenMenuGroupChatHeader, groupChatData} = useSelector(state => state.chat)

    const handleOpenMenu = () => {
        dispatch(setOpenMenuGroupChatHeader(!isOpenMenuGroupChatHeader))
    }

    const uploadImage = (url) => {
        setImageUrl(url)
        updateGroupChat({image_url: url})
    }


    const openProfile = () => {
        dispatch(setTheirProfileData(user.id))
        if (!isTheirProfileOpen) {
            dispatch(handleOpenTheirProfile())
        }
    }

    async function updateGroupChat({ image_url }) {
        try {
            setLoading(true)
            const user = supabase.auth.user()
    
            const updates = {
                id: router.query.id,
                image: image_url
            }
    
            let { error } = await supabase.from('group_chats').upsert(updates, {
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
			.from('image-group-chats')
			.upload(filePath, file)

			if (uploadError) {
			    throw uploadError
			}

			uploadImage(filePath)
			updateGroupChatImage(router.query.id, filePath)
		} catch (error) {
			console.log(error.message)
		} finally {
			setUploading(false)
		}
	}

    return {
        models: {
            isOpenMenuGroupChatHeader,
            groupChatData,
            image_url,
            uploading,
            isTheirProfileOpen
        },
        commands: {
            updateGroupChat,
            uploadImage,
            uploadAvatar,
            openProfile,
            handleOpenMenu
        }
    }
}