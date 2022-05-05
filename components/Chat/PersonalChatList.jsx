import PreviewPersonalChat from 'components/Chat/PreviewPersonalChat';
import { fetchAllPersonalChats } from '../../utils/Store';
import { useState, useEffect, useContext } from 'react';
import { supabase } from 'utils/supabaseClient';
import ChatContext from '../../context/ChatContext';
import {useSelector} from 'react-redux'

export default function ChatList() {
    const [filteredChats, setFilteredChats] = useState(null)
    const [searchChats, setSearchChats] = useState(null)
    const {searchValue} = useContext(ChatContext)

    const {user} = useSelector(state => state.auth)

    const useStore = (props) => {
        const [personalChats, setPersonalChats] = useState([])
        const [newPersonalChat, handleNewPersonalChat] = useState(null)
    
        useEffect(() => {
            fetchAllPersonalChats(setPersonalChats)

            const personalChatListener = supabase
                .from('personal_chats')
                .on('INSERT', payload => {
                    console.log('personal',payload);
                    handleNewPersonalChat(payload.new)
                })
                .on('DELETE', payload => {handleNewPersonalChat(payload.old)})
                .subscribe()
    
    
            return () => {
                personalChatListener.unsubscribe()
            }
        }, [])
    
        useEffect(() => {
            if (newPersonalChat) setPersonalChats(personalChats.concat(newPersonalChat))
        }, [newPersonalChat])
    
        return {personalChats}
    }

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
            <div className='flex flex-col h-[672px] overflow-y-auto w-full'>
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