// * react/next
import { useState, useEffect } from 'react';

// * redux
import {useSelector} from 'react-redux'

// * supabase
import { supabase } from 'supabase/supabaseClient';
import { fetchAllPrivatChats } from 'supabase/modules/chat';

// * components
import PreviewPrivatChat from './PreviewPrivatChat';

// ** при монтировании/размонтировании подписываемся/отписываемся на realtime
const useStore = () => {
    const [privatChats, setPrivatChats] = useState([])
    const [newPrivatChat, handleNewPrivatChat] = useState(null)

    useEffect(() => {
        fetchAllPrivatChats(setPrivatChats)

        const privatChatListener = supabase
            .from('privat_chats')
            .on('INSERT', payload => {
                handleNewPrivatChat(payload.new)
            })
            .on('DELETE', payload => {handleNewPrivatChat(payload.old)})
            .subscribe()


        return () => {
            privatChatListener.unsubscribe()
        }
    }, [])

    useEffect(() => {
        if (newPrivatChat) setPrivatChats(privatChats.concat(newPrivatChat))
    }, [newPrivatChat])

    return {privatChats}
}

export default function ChatList() {
    const [filteredChats, setFilteredChats] = useState(null)
    const [searchChats, setSearchChats] = useState(null)

    const {searchValue} = useSelector(state => state.chat)
    const {user} = useSelector(state => state.auth)

    const {privatChats} = useStore({})

    // ** при изменении privatChats фильтруем чаты и записываем их в стейт filteredChats
    useEffect(() => {
        const filtered = privatChats.filter(chat => user.id === chat.created_by.id || user.id === chat.interlocutor.id)
        setFilteredChats(filtered)
    }, [privatChats])

    // ** при изменении searchValue фильтруем чаты и записываем их в стейт searchChats
    useEffect(() => {
        if(filteredChats !== null) {
            const search = filteredChats.filter(chat => chat.chat_title.toLowerCase().includes(searchValue.toLowerCase()))
            setSearchChats(search)
        }
    }, [searchValue])

    const chatListCondition = !searchValue.length && filteredChats !== null
    const searchChatCondition = searchValue.length > 0 && searchChats !== null && searchChats.length > 0
    
    return (
            <div className='flex flex-col h-full overflow-y-auto w-full custom-scroll'>
                {

                    chatListCondition
                    ? filteredChats.map((chat) => (
                        <PreviewPrivatChat key={chat.id} chatData={chat}/>
                    ))
                    : (
                        <div className='text-white text-3xl text-center font-semibold'>
                            Chats not found
                        </div>
                    )
                }
                {
                    searchChatCondition
                    && searchChats.map((chat) => (
                        <PreviewPrivatChat key={chat.id} chatData={chat}/>
                    )) 
                }
            </div>
        
    )
}