// * react/next
import { useState } from 'react';
import GroupChatContext from './GroupChatContext'

const GroupChatProvider = (props) => {
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const [groupChatData, setGroupChatData] = useState({})
    
    return (
        <GroupChatContext.Provider value={{isOpenMenu, groupChatData, setIsOpenMenu, setGroupChatData}}>
            {props.children}
        </GroupChatContext.Provider>
    )
}

export default GroupChatProvider