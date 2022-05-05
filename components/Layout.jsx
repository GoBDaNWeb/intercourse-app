import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Sidebar from './Sidebar';
import GroupChatList from './Chat/GroupChatList';
import PersonalChatList from './Chat/PersonalChatList';
import ChatContext from 'context/ChatContext';
import {useDispatch, useSelector} from 'react-redux'

export default function Layout({children}) {
    const router = useRouter()
    const {isPersonalChats} = useContext(ChatContext)

    const {theme} = useSelector(state => state.theme)
    
    return (
        <div className={`h-[100vh] flex flex-col overflow-hidden ${theme}`}>
            <div className='flex h-full'>
                {
                router.pathname !== '/' && 
                <Sidebar>
                    {
                        isPersonalChats
                        ? <PersonalChatList/>
                        : <GroupChatList/>
                    }
                </Sidebar>
                }
                {children}
            </div>
        </div>
    )
}