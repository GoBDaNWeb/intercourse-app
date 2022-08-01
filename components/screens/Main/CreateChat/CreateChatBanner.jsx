import {BiMessageAdd} from 'react-icons/bi'

export default function CreateChatBanner({createChatWindow}) {
    return (
        <div className='flex items-center justify-center w-full '>
            <div 
                onClick={createChatWindow}
                className='transition-all duration-[0.4s] bg-secondary text-primary h-96 w-96 flex flex-col items-center justify-center gap-4 rounded-2xl cursor-pointer border-2 border-solid border-gray-200 dark:border-gray-800'
            >
                <h3 className='text-3xl font-medium'>
                    Want to create a chat?
                </h3>
                <BiMessageAdd className='text-9xl'/>
                <h5 className='text-4xl font-bold'>
                    Click
                </h5>
            </div>
        </div>
    )
}