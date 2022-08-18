// * react/next
import {memo} from 'react'
import { useRouter } from 'next/router';

// * redux
import {useSelector} from 'react-redux'

// * components
import Sidebar from './Sidebar';
import GroupChatList from 'components/common/GroupChatList';
import PrivatChatList from 'components/common/PrivatChatList';

const Layout = memo(({children}) => {
    const router = useRouter()

    const {theme} = useSelector(state => state.theme)
    const {isPrivatChats} = useSelector(state => state.sidebar)
    const {isOpen} = useSelector(state => state.sidebar)
    
    return (
        <div className={`h-[100vh] w-[100vw] flex flex-col overflow-hidden ${theme}`}>
            <div className={`flex w-full h-full justify-center items-center ${isOpen ? 'sidebar-open' : ''}`}>
                {
                    router.pathname !== '/' && 
                    <Sidebar>
                        {
                            isPrivatChats
                            ? <PrivatChatList/>
                            : <GroupChatList/>
                        }
                    </Sidebar>
                }
                {children}
            </div>
        </div>
    )
})

Layout.displayName = 'Layout';

export default Layout