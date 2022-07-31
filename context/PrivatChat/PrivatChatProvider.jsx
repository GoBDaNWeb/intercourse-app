// * react/next
import { useState } from 'react';
import PrivatChatContext from './PrivatChatContext'

const PrivatChatProvider = (props) => {
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const [privatChatData, setPrivatChatData] = useState({})
    
    return (
        <PrivatChatContext.Provider value={{isOpenMenu, privatChatData, setIsOpenMenu, setPrivatChatData}}>
            {props.children}
        </PrivatChatContext.Provider>
    )
}

export default PrivatChatProvider