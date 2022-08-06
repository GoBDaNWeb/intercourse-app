// * hooks 
import {useChatMenu} from './useChatMenu'

// * framer-motion
import {motion, AnimatePresence} from 'framer-motion'

// * components
import ChatMenuContent from './ChatMenuContent'
import Participants from './Participants'

const dropIn = {
    before: {
        y: '-100vh',
        opacity: 0,
    },
    in: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.1,
            type: 'spring',
            damping: 55,
            stiffness: 600,
        },
    },
    after: {
        y: '-100vh',
        opacity: 0,
        transition: {
            duration: 0.5,
        },
    },
}

export default function ChatMenu() {
    const {
        models: {
            isOpenMenuGroupChatHeader
        },
        commands: {
            handleOpenMenu
        }
    } = useChatMenu()

    return (
        <div 
            className={`flex flex-col justify-start items-center py-4 pt-20 w-full h-full bg-primary absolute z-10 border-b-2 border-solid border-gray-200 dark:border-gray-800 shadow overflow-x-hidden overflow-y-auto transition duration-700 ${isOpenMenuGroupChatHeader ? 'translate-y-[0vh] opacity-100' : 'translate-y-[-100vh] opacity-0'}}`}>   
            <div 
                onClick={handleOpenMenu}
                className='w-12 h-6 absolute bottom-2 cursor-pointer'
            >
                <div className='after:absolute after:bg-white after:w-6 after:h-1 after:left-1 after:bottom-2 after:rotate-[-40deg] before:absolute before:bg-white before:w-6 before:h-1 before:right-1 before:bottom-2 before:rotate-[40deg]'>
                </div>
            </div>
            <div className='flex flex-col gap-5 items-center w-full'>
                <ChatMenuContent/>
                <Participants/>
            </div>
        </div>
    )
}