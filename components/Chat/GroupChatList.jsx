import PreviewGroupChat from './PreviewGroupChat';
import { fetchAllGroupChats } from 'utils/Store';
import { supabase } from 'utils/supabaseClient';
import { useState, useEffect } from 'react';
import {useSelector} from 'react-redux'

export default function GroupChatList() {
    const [filteredChats, setFilteredChats] = useState(null)
    const [searchChats, setSearchChats] = useState(null)

    const {user} = useSelector(state => state.auth)
    const {searchValue} = useSelector(state => state.chat)

    const useStore = (props) => {
        const [groupChats, setGroupChats] = useState([])
        const [newGroupChat, handleNewGroupChat] = useState(null)
    
        useEffect(() => {
            fetchAllGroupChats(setGroupChats)
    
            const groupChatListener = supabase
                .from('group_chats')
                .on('INSERT', payload => {
                    console.log(payload);
                    handleNewGroupChat(payload.new)
                })
                .on('DELETE', payload => {handleNewGroupChat(payload.old)})
                .subscribe()
    
            return () => {
                groupChatListener.unsubscribe()
            }
        }, [])
        
        useEffect(() => {
            if (newGroupChat) setGroupChats(groupChats.concat(newGroupChat))
        }, [newGroupChat])
    
        return {groupChats}
    }


    // ** следим за персональными чатами и рендерим их 
    const {groupChats} = useStore({})

    // ** при изменении personalChats фильтруем чаты и записываем их в стейт filteredChats
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

    
    return (
        <div className='flex flex-col w-full'>
                {
                    !searchValue.length && filteredChats !== null
                    && filteredChats.map((chat) => (
                        <div key={chat.id}>
                            <PreviewGroupChat chatData={chat}/>
                        </div>
                    ))
                }
                {
                    searchValue.length > 0 && searchChats !== null
                    && searchChats.map((chat) => (
                        <PreviewGroupChat key={chat.id} chatData={chat}/>
                    ))
                }
        </div>
    )
}