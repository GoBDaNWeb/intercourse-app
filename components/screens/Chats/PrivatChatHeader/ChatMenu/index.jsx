// * react/next 
import {memo} from 'react'

// * hooks
import {useChatMenu} from './useChatMenu'

// * icons
import {AiOutlineEdit} from 'react-icons/ai'

// * components
import UploadPrivatChatImage from './UploadPrivatChatImage'
import Participants from './Participants'

export default memo(function ChatMenu() {
    const {
        models: {
            isOpenMenuPrivatChatHeader,
            privatChatData,
            image_url,
        },
        commands: {
            handleOpenMenu,
            uploadImage
        }
    } = useChatMenu()

    return (
        <div className={`flex flex-col justify-start items-center py-4 pt-28 w-full h-[500px] bg-primary absolute z-10 border-b-2 border-solid border-gray-200 dark:border-gray-800 shadow transition duration-700 ${isOpenMenuPrivatChatHeader ? 'translate-y-[0vh] opacity-100' : 'translate-y-[-100vh] opacity-0'}`}>   
            <div 
                onClick={handleOpenMenu}
                className='w-12 h-6 absolute bottom-2 cursor-pointer'
            >
                <div className='after:absolute after:bg-white after:w-6 after:h-1 after:left-1 after:bottom-2 after:rotate-[-40deg] before:absolute before:bg-white before:w-6 before:h-1 before:right-1 before:bottom-2 before:rotate-[40deg]'>
                </div>
            </div>
            <div className='flex flex-col gap-5 items-center w-full'>
                <div className='flex flex-col items-center'>
                    <UploadPrivatChatImage 
                        url={image_url}
                        size={128}
                        onUpload={uploadImage}
                        text_size={'6xl'}
                    />
                    {/* {chatData && chatData.chat_title[0].toUpperCase()} */}
                    <div className='relative flex items-center gap-2 text-primary font-semibold text-2xl'>
                        {privatChatData?.chat_title}
                        <span 
                            className='absolute right-[-30px] cursor-pointer group-hover:opacity-100 opacity-0 transition'
                        >
                            <AiOutlineEdit/>
                        </span>
                    </div>
                </div>
                <Participants/>
            </div>
        </div>
    )
})