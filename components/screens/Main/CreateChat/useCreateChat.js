import {useState} from 'react'

export function useCreateChat() {
    const [createChat, setCreateChat] = useState(false)
   
    // ** функция монтирования/размонтирования элемента createChat 
    const createChatWindow = () => {
        setCreateChat(!createChat)
    }

    return {
        models: {
            createChat
        },
        commands: {
            createChatWindow
        }
    }
}