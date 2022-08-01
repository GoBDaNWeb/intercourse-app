// * react/next
import { useState, useEffect } from 'react';

// * redux
import {useSelector} from 'react-redux'

// * supabase
import { supabase } from 'supabase/supabaseClient';
import { fetchAllGroupChats } from 'supabase/modules/chat';

// * components
import PreviewGroupChat from './PreviewGroupChat';
import { ThreeDots } from 'react-loader-spinner';

const useStore = (props) => {
    const [groupChats, setGroupChats] = useState([])
    const [newGroupChat, handleNewGroupChat] = useState(null)

    useEffect(() => {
        fetchAllGroupChats(setGroupChats)

        const groupChatListener = supabase
            .from('group_chats')
            .on('INSERT', payload => {
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

export default function GroupChatList() {
    const [filteredChats, setFilteredChats] = useState(null)
    const [searchChats, setSearchChats] = useState(null)

    const {user} = useSelector(state => state.auth)
    const {searchValue} = useSelector(state => state.chat)

    // ** следим за персональными чатами и рендерим их 
    const {groupChats} = useStore({})

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
    console.log(filteredChats)
    console.log(searchChats)
    return (
            <div className='flex flex-col h-full overflow-y-auto w-full custom-scroll'>
                {

                    chatListCondition
                    && filteredChats.map((chat) => (
                        <PreviewGroupChat key={chat.id} chatData={chat}/>
                    ))
                }
                {
                    searchChatCondition
                    && searchChats.map((chat) => (
                        <PreviewGroupChat key={chat.id} chatData={chat}/>
                    )) 
                }
                {   loadingChatsCondition
                    && (
                        <div className='flex w-full justify-center'>
                            <ThreeDots color="#22C55E"/>
                        </div>
                    )
                }
            </div> 
    )
}