// * react/next
import {memo} from 'react';

// * redux
import {useSelector} from 'react-redux'

// * icons
import {RiWechatLine} from 'react-icons/ri'

// * components
import RenderMessages from './RenderMessages';

const ChatWindow = memo(() => {   
    const {messages} = useSelector(state => state.chat)
    const {bgChat} = useSelector(state => state.chat)

    return (
        <div className={`transition-all duration-[0.4s] h-screen w-full flex flex-col justify-end items-center bg-chat-${bgChat}`}>
            {
                messages.length
                ? (
                    <div className='pl-20 pr-10 flex flex-col gap-2 w-full h-full overflow-auto custom-scroll pb-2 mt-14 pt-2'>
                        <RenderMessages/>
                    </div>
                ) : (
                    <div className='flex justify-center items-center gap-3 w-full h-full'>
                        <div className='flex flex-col gap-4 justify-center items-center w-96 h-96 bg-black rounded-[20px] shadow-custom bg-opacity-40'>
                            <h3 className='text-white text-3xl font-semibold text-center'>
                                why is the chat still empty?
                            </h3>
                            <RiWechatLine className='text-white text-8xl'/>
                        </div>
                    </div>
                )
            }
        </div>
    )
})

ChatWindow.displayName = 'ChatWindow';

export default ChatWindow