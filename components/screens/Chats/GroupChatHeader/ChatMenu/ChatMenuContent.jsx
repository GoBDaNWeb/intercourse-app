// * react/next
import {useState, useContext} from 'react'
import GroupChatContext from 'context/GroupChat/GroupChatContext'

// * supabase
import {supabase} from 'utils/supabaseClient'

// * icons
import {AiOutlineEdit} from 'react-icons/ai'

// * components
import UploadGroupChatImage from 'components/screens/Chats/GroupChatHeader/ChatMenu/UploadGroupChatImage'

export default function ChatMenuContent() {
    const [image_url, setImageUrl] = useState(null)
    const [loading, setLoading] = useState(false)

    const {groupChatData} = useContext(GroupChatContext)

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
    return (
        <div className='flex flex-col items-center'>
            <UploadGroupChatImage 
                url={image_url}
                size={128}
                onUpload={(url) => {
                    setImageUrl(url)
                    updateGroupChat({image_url: url})
                }}
                text_size={'6xl'}
            />

            <div className='relative flex items-center gap-2 text-primary font-semibold text-2xl'>
                {groupChatData?.chat_title}
                <span 
                    className='absolute right-[-30px] cursor-pointer group-hover:opacity-100 opacity-0 transition'
                >
                    <AiOutlineEdit/>
                </span>
            </div>
        </div>
    )
}