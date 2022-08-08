// * react/next 
import {useRouter} from 'next/router'

// * redux 
import {useSelector} from 'react-redux'

// * icons
import {AiOutlineEdit} from 'react-icons/ai'

// * components
import UploadChatImage from 'components/shared/UploadChatImage'

const ChatMenuContent = () => {
    const router = useRouter()
    const {id} = router.query

    const {groupChatData} = useSelector(state => state.chat)

    return (
        <div className='flex flex-col items-center'>
            <UploadChatImage 
                isPrivate={false}
                id={id}
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

export default ChatMenuContent