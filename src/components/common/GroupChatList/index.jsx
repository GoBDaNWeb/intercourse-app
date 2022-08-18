// * react/next
import { useState, useEffect } from 'react';

// * redux
import {useSelector} from 'react-redux'

// * hooks 
import {useGroupChats} from 'hooks/useGroupChats'

// * components
import ChatItem from './components/ChatItem';
import { ThreeDots } from 'react-loader-spinner';

const GroupChatList = () => {
    const [filteredChats, setFilteredChats] = useState([])
    const [searchChats, setSearchChats] = useState(null)

    const {user} = useSelector(state => state.auth)
    const {searchValue} = useSelector(state => state.sidebar)

    const {groupChats} = useGroupChats()

    const filteredByMembers = () => {
        return groupChats.filter(chat => {
            const isContainInChat = chat.members.map(item => item.id === user.id)
            .indexOf(true) != -1
            return isContainInChat === true
        })   
    }
    
    const filteredByCreated = () => {
        return groupChats.filter(chat => {
            return user.id === chat.created_by.id
        }) 
    }

    const filterMembers = (arr, tmpArr) => {
        arr.forEach(item => {
            tmpArr.push(item)
            setFilteredChats([...tmpArr])
        })
    }

    const filterCreator = (arr, tmpArr) => {
        arr.forEach(item => {
            tmpArr.push(item)
            setFilteredChats([...tmpArr])
        })
    }


    useEffect(() => {
        if (user !== null) {  
            let tmpArr = []
            filterMembers(filteredByMembers(), tmpArr)
            filterCreator(filteredByCreated(), tmpArr)
        } 
    }, [groupChats])


    useEffect(() => {
        if(filteredChats !== null) {
            const search = filteredChats.filter(chat => {
                return chat.chat_title
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
            })
            setSearchChats(search)
        }
    }, [searchValue])

    const chatListCondition = !searchValue.length && filteredChats !== null
    const searchChatCondition = searchValue.length > 0 && searchChats !== null && searchChats.length > 0
    const loadingChatsCondition = filteredChats === null && searchChats === null
  
    return (
            <div className='flex flex-col h-full overflow-y-auto w-full custom-scroll'>
                {

                    chatListCondition
                    && filteredChats.map((chat) => (
                        <ChatItem key={chat.id} chatData={chat}/>
                    ))
                }
                {
                    searchChatCondition
                    && searchChats.map((chat) => (
                        <ChatItem key={chat.id} chatData={chat}/>
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

export default GroupChatList