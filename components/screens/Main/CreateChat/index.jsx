// * react/next
import { useState } from 'react';

// * components
import CreateChatBanner from './CreateChatBanner';
import CreateChatPanel from './CreateChatPanel';

const CreateChat = () => {
    const [createChat, setCreateChat] = useState(false)
   
    const createChatWindow = () => {
        setCreateChat(!createChat)
    }

    return (
        <div className='flex items-center justify-center w-full'>
            {
                createChat 
                ? <CreateChatPanel createChatWindow={createChatWindow}/>
                : <CreateChatBanner createChatWindow={createChatWindow}/>
            }
        </div>
    )
}

export default CreateChat