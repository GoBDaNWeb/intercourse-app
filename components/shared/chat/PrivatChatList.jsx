// * react/next
import { useState, useEffect } from 'react';

// * redux
import {useSelector} from 'react-redux'
import { supabase } from 'utils/supabaseClient';

// * supabase
import { fetchAllPrivatChats } from 'utils/Store';

// * components
import PreviewPrivatChat from 'components/shared/chat/PreviewPrivatChat';

export default function ChatList() {
    const [filteredChats, setFilteredChats] = useState(null)
    const [searchChats, setSearchChats] = useState(null)

    const {searchValue} = useSelector(state => state.chat)
    const {user} = useSelector(state => state.auth)

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


    return (
            <div className='flex flex-col h-full overflow-y-auto w-full custom-scroll'>
                {

                    !searchValue.length && filteredChats !== null
                    && filteredChats.map((chat) => (
                        <PreviewPrivatChat key={chat.id} chatData={chat}/>
                    ))
                }
                {
                    searchValue.length > 0 && searchChats !== null
                    && searchChats.map((chat) => (
                        <PreviewPrivatChat key={chat.id} chatData={chat}/>
                    ))
                }
            </div>
        
    )
}