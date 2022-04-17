import { useContext } from 'react';
import UserContext from './../context/UserContext';
import { useRouter } from 'next/router';
import Sidebar from './Sidebar';
import GroupChatList from './Chat/GroupChatList';
import PersonalChatList from './Chat/PersonalChatList';
import Menu from './Menu';
import ChatContext from './../context/ChatContext';

export default function Layout({children}) {
    const {user} = useContext(UserContext)
    const router = useRouter()

    const {isPersonalChats} = useContext(ChatContext)
    
    return (
        <div className='h-[100vh] flex flex-col bg-[#F4EBDB]'>
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
                {
                    router.pathname !== '/' && 
                    <Menu/> 
                }
                {children}
            </div>
        </div>
    )
}