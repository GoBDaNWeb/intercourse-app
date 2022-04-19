import PreviewPersonalChat from 'components/Chat/PreviewPersonalChat';
import { fetchAllPersonalChannels, useStore } from '../../utils/Store';
import { useState, useEffect, useContext } from 'react';
import { supabase } from 'utils/supabaseClient';
import ChatContext from '../../context/ChatContext';
import UserContext from './../../context/UserContext';

export default function ChatList() {
    const [filteredChats, setFilteredChats] = useState(null)
    const [searchChats, setSearchChats] = useState(null)
    const {user} = useContext(UserContext)
    const {searchValue} = useContext(ChatContext)

    // ** следим за персональными чатами и рендерим их 
    const {personalChats} = useStore({})

    // ** при изменении personalChats фильтруем чаты и записываем их в стейт filteredChats
    useEffect(() => {
        const filtered = personalChats.filter(chat => user.id === chat.created_by.id || user.id === chat.interlocutor.id)
        setFilteredChats(filtered)
    }, [personalChats])

    // ** при изменении searchValue фильтруем чаты и записываем их в стейт searchChats
    useEffect(() => {
        if(filteredChats !== null) {
            const search = filteredChats.filter(chat => chat.chat_title.toLowerCase().includes(searchValue.toLowerCase()) && user.id === chat.created_by.id || user.id === chat.interlocutor.id)
            setSearchChats(search)
        }
    }, [searchValue])

    return (
            <div className='flex flex-col gap-2 h-96 w-full'>
                {

                    !searchValue.length && filteredChats !== null
                    && filteredChats.map((chat) => (
                        <PreviewPersonalChat key={chat.id} chatData={chat}/>
                    ))
                }
                {
                    searchValue.length > 0 && searchChats !== null
                    && searchChats.map((chat) => (
                        <PreviewPersonalChat key={chat.id} chatData={chat}/>
                    ))
                }
            </div>
        
    )
}