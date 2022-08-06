// * hooks
import {useChatMenu} from './useChatMenu'

// * icons
import {AiOutlineEdit} from 'react-icons/ai'

// * components
import UploadGroupChatImage from './UploadGroupChatImage'

export default function ChatMenuContent() {
    const {
        models: {
            groupChatData
        }
    } = useChatMenu()

    return (
        <div className='flex flex-col items-center'>
            <UploadGroupChatImage 
                size={128}
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