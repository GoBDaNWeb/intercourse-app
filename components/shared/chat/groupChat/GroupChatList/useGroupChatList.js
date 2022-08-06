// * react/next
import { useState, useEffect } from 'react';

// * redux
import {useSelector} from 'react-redux'

// * hooks
import {useGroupChats} from 'hooks/useGroupChats'


export function useGroupChatList() {
    const [filteredChats, setFilteredChats] = useState(null)
    const [searchChats, setSearchChats] = useState(null)

    const {user} = useSelector(state => state.auth)
    const {searchValue} = useSelector(state => state.sidebar)

    // ** следим за персональными чатами и рендерим их 
    const {groupChats} = useGroupChats()

    // ** при изменении privatChats фильтруем чаты и записываем их в стейт filteredChats
    useEffect(() => {
        if (user !== null) {
            const filteredByMembers = groupChats.filter(chat => {
                const boolUsers = chat.members.map(item => item.id === user.id)
                const containsTheCurrentUser = boolUsers.indexOf(true) != -1
                chat.filtered_by_member = containsTheCurrentUser
                return chat.filtered_by_member === true
            })      
            const filteredByCreated = groupChats.filter(chat => {
                return user.id === chat.created_by.id
            })
            let tmp = []
            filteredByMembers.forEach(item => {
                tmp.push(item)
                setFilteredChats([...tmp])
            })
            filteredByCreated.forEach(item => {
                tmp.push(item)
                setFilteredChats([...tmp])
            })
        } 
    }, [groupChats])

    // ** при изменении searchValue фильтруем чаты и записываем их в стейт searchChats
    useEffect(() => {
        if(filteredChats !== null) {
            const search = filteredChats.filter(chat => chat.chat_title.toLowerCase().includes(searchValue.toLowerCase()))
            setSearchChats(search)
        }
    }, [searchValue])

    const chatListCondition = !searchValue.length && filteredChats !== null
    const searchChatCondition = searchValue.length > 0 && searchChats !== null && searchChats.length > 0
    const loadingChatsCondition = filteredChats === null && searchChats === null

    return {
        models: {
            chatListCondition,
            filteredChats,
            searchChatCondition,
            searchChats,
            loadingChatsCondition
        }
    }
}