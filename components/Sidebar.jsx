// * react/next
import Image from 'next/image'

// * redux
import {useSelector, useDispatch} from 'react-redux'
import {setSearchValue, handleTypeChats} from 'store/chatSlice'

// *  framer-motion
import {motion, AnimatePresence} from 'framer-motion'

// * icons
import {AiOutlineSearch} from 'react-icons/ai'

// * components
import Profile from './profile/Profile';
import TheirProfile from './profile/TheirProfile';
import PreviewProfileUser from './profile/PreviewProfileUser';


export default function Sidebar({children}) {
    const {isPrivatChats} = useSelector(state => state.chat)
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
        <div id='sidebar' className={`xl:w-[35%] sm:w-[26.5rem] w-full transition-all duration-[0.4s] max-w-[700px] fixed xl:relative top-0 left-0 bottom-0 right-0 flex flex-col items-between justify-between h-full bg-secondary z-50 overflow-hidden`}>
            <div className='h-full flex flex-col  overflow-hidden'>
                <div className='flex flex-col w-full items-center px-4 pt-4 border-b-2 border-solid border-gray-200 dark:border-gray-800'>
                    <div className='flex items-center w-full text-left'>
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
                    <div className='flex flex-col gap-2 items-center justify-center h-full w-full px-2'>
                        <div className='flex items-center rounded-full border-2 border-solid border-gray-200 dark:border-gray-800 h-12 w-full bg-opacity-80 text-secondary px-4 mt-2'>
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
                                className={`border-2 border-solid border-gray-200 dark:border-gray-800 bg-opacity-80 py-2 rounded-l-full  text-primary font-semibold w-40 ${isPrivatChats ? 'bg-accent border-0 text-accent pointer-events-none' : ''}`}
                            >
                                privat chats
                            </button>
                            <button 
                                onClick={() => dispatch(handleTypeChats())}
                                className={`border-2 border-solid border-gray-200 dark:border-gray-800 bg-opacity-80 py-2 rounded-r-full text-primary font-semibold w-40 ${!isPrivatChats ? 'bg-accent border-0 text-accent pointer-events-none' : ''}`}
                            >
                                group chats
                            </button>
                        </div>
                    </div>
                </div>
                {children}
            </div>
            <div className='relative min-h-[80px]'>
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
                    className={`absolute bottom-0 border-t-2  border-solid border-gray-200 dark:border-gray-800 w-full bg-secondary `}
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