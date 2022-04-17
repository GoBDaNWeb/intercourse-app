import PreviewGroupChat from './PreviewGroupChat';
import { fetchAllPersonalChannels, useStore } from '../../utils/Store';
import { useState, useEffect, useContext } from 'react';
import ChatContext from '../../context/ChatContext';
import UserContext from './../../context/UserContext';

export default function GroupChatList() {
    const [filteredChats, setFilteredChats] = useState(null)
    const [searchChats, setSearchChats] = useState(null)
    const {user} = useContext(UserContext)
    const {searchValue} = useContext(ChatContext)

    // ** следим за персональными чатами и рендерим их 
    const {groupChats} = useStore({})

    // ** при изменении personalChats фильтруем чаты и записываем их в стейт filteredChats
    useEffect(() => {
        const filteredByMembers = groupChats.filter(chat => {
            const l = chat.members.map(item => item.id === user.id)
            const j = l.indexOf(true) != -1
            chat.filtered_by_member = j
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
        
    }, [groupChats])


    // ** при изменении searchValue фильтруем чаты и записываем их в стейт searchChats
    useEffect(() => {    
        

    }, [searchValue])

    
    return (
        <div className='flex flex-col gap-2 h-96 w-full'>
                {
                    filteredChats !== null
                    && filteredChats.map((chat) => (
                        <div key={chat.id}>
                            <PreviewGroupChat chatData={chat}/>
                        </div>
                    ))
                }
                {/* {
                    searchValue.length > 0 && searchChats !== null
                    && searchChats.map((chat) => (
                        <PreviewGroupChat key={chat.id} chatData={chat}/>
                    ))
                } */}
        </div>
    )
}