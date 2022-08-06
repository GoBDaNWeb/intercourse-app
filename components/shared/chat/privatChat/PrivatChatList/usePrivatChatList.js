// * react/next
import { useState, useEffect } from 'react';

// * redux
import { useSelector } from "react-redux";

// * hooks 
import {usePrivatChats} from 'hooks/usePrivatChats'

export function usePrivatChatList() {
    const [filteredChats, setFilteredChats] = useState(null)
    const [searchChats, setSearchChats] = useState(null)


    const {searchValue} = useSelector(state => state.sidebar)
    const {user} = useSelector(state => state.auth)

    const {privatChats} = usePrivatChats()

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

    const chatListCondition = !searchValue?.length && filteredChats !== null
    const searchChatCondition = searchValue?.length > 0 && searchChats !== null && searchChats?.length > 0
    const loadingChatsCondition = filteredChats === null && searchChats === null

    return {
        models: {
            searchValue,
            filteredChats,
            searchChats,
            chatListCondition,
            searchChatCondition,
            loadingChatsCondition
        }
    }
}