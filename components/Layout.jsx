import { useRouter } from 'next/router';
import Sidebar from './Sidebar';
import GroupChatList from './Chat/GroupChatList';
import PersonalChatList from './Chat/PersonalChatList';
import {useSelector} from 'react-redux'

export default function Layout({children}) {
    const router = useRouter()

    const {theme} = useSelector(state => state.theme)
    const {isPersonalChats} = useSelector(state => state.chat)
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