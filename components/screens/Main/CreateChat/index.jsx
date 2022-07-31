// * react/next
import { useState } from 'react';

// * components
import CreateChatBanner from './CreateChatBanner';
import CreateChatPanel from './CreateChatPanel';

export default function CreateChat() {
    const [createChat, setCreateChat] = useState(false)
   
    // ** функция монтирования/размонтирования элемента createChat 
    const createChatWindow = () => {
        setCreateChat(!createChat)
    }
    
    return (
        <>
            {
                createChat 
                ? <CreateChatPanel createChatWindow={createChatWindow}/>
                : <CreateChatBanner createChatWindow={createChatWindow}/>
            }
        </>
    )
}