import OwnMessage from 'components/Chat/OwnMessage';
import Message from 'components/Chat/Message';
import {FiSend} from 'react-icons/fi'

export default function ChatWindow() {
    return (
        <div className="h-screen w-[900px] bg-gray-400 flex flex-col justify-end items-center p-2 pt-40 pb-20">
            <Message/>
            <OwnMessage/>
            <Message/>
            <div className='flex items-center justify-between w-[595px] bg-white h-12 rounded-full p-2 mt-16'>
                <input 
                    className='w-full outline-none'
                    type="text"
                    placeholder='message' 
                />
                <div className='flex items-center justify-center rounded-full text-2xl bg-gray-300 w-10 h-10'>
                    <FiSend/>
                </div>
            </div>
        </div>
    )
}