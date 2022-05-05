import {AiOutlineSearch} from 'react-icons/ai'
import Image from 'next/image'
import Profile from './profile/Profile';
import TheirProfile from './profile/TheirProfile';
import PreviewProfileUser from './profile/PreviewProfileUser';
import {useSelector, useDispatch} from 'react-redux'
import {motion, AnimatePresence} from 'framer-motion'
import {setSearchValue, handleTypeChats} from 'store/chatSlice'

export default function Sidebar({children}) {
    const {isPersonalChats} = useSelector(state => state.chat)
    const {isProfileOpen, isTheirProfileOpen} = useSelector(state => state.profile)
    const {theme} = useSelector(state => state.theme)

    const dispatch = useDispatch()

    // ** записывает изменения в переменную
    const onChange = (e) => {
        const {value} = e.target
        dispatch(setSearchValue(value))
    }

    const variant = {
        open: {
            height: '100vh',
            transition: {
                duration: 0.3,
                damping: 45,
                stiffness: 900,
            },
        },
        close: {
            height: '80px',
            transition: {
                duration: 0.5,
                damping: 45,
                stiffness: 900,
            },
        }
    }

    return (
        <div className="w-[35%] relative flex flex-col items-center h-full bg-secondary border-r-2 border-solid border-gray-200 dark:border-gray-800 z-50 overflow-hidden">
            <div className='flex w-full items-center h-14 px-4 pt-4'>
                <div className='flex items-center'>
                    {
                        theme === 'dark' 
                        ? <Image
                            src='/Logo.svg'
                            alt="Logo" 
                            width={62} 
                            height={62} 
                            />
                        : <Image
                            src='/carbon_chat-bot.svg'
                            alt="Logo" 
                            width={62} 
                            height={62} 
                            />
                    }
                    <h3 className='mt-3 font-bold text-2xl text-primary'>
                        Intercourse
                    </h3>
                </div>
            </div>
            <div className='flex flex-col gap-2 items-center justify-center w-full'>
                <div className='flex items-center rounded-full border-2 border-solid border-gray-200 dark:border-gray-800 h-14 bg-opacity-80 text-secondary px-4 mt-8'>
                    <div className=' text-4xl'>
                        <AiOutlineSearch/>
                    </div>
                    <input 
                        onChange={(e) => onChange(e)}
                        className="w-full bg-transparent outline-none text-xl font-semibold px-2 text-secondary"
                        type="text" 
                        placeholder='Search chat'
                    />
                </div>
                <div className='flex justify-center items-center px-4 mb-2 gap-[1px]'>
                    <button 
                        onClick={() => dispatch(handleTypeChats())}
                        className={`border-2 border-solid border-gray-200 dark:border-gray-800 bg-opacity-80 py-2 rounded-l-full  text-primary font-semibold w-40 ${isPersonalChats ? 'bg-accent border-0 text-accent pointer-events-none' : ''}`}
                    >
                        personal chats
                    </button>
                    <button 
                        onClick={() => dispatch(handleTypeChats())}
                        className={`border-2 border-solid border-gray-200 dark:border-gray-800 bg-opacity-80 py-2 rounded-r-full text-primary font-semibold w-40 ${!isPersonalChats ? 'bg-accent border-0 text-accent pointer-events-none' : ''}`}
                    >
                        group chats
                    </button>
                </div>
                {/* <div className='w-96'>
                    <ChatFolders/>
                </div> */}
                {children}
                <AnimatePresence exitBeforeEnter>
                    {
                        isTheirProfileOpen && 
                        <motion.div 
                            className={`absolute bottom-0 border-t-2  border-solid border-gray-200 dark:border-gray-800 w-full h-[80px] bg-secondary `}
                            variants={variant}
                            animate={isTheirProfileOpen ? 'open' : 'close'}
                            exit='close'
                        >
                            <TheirProfile/>
                        </motion.div>
                    }
                </AnimatePresence>
                <motion.div 
                    className={`absolute bottom-0 border-t-2  border-solid border-gray-200 dark:border-gray-800 w-full h-[80px] bg-secondary `}
                    variants={variant}
                    animate={isProfileOpen ? 'open' : 'close'}
                >
                    <Profile/>
                    <PreviewProfileUser/>
                </motion.div>
            </div>
        </div>
    )
}