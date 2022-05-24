// * react/next
import { useState, useEffect } from 'react'
import {useRouter} from 'next/router'

// * redux
import {useSelector, useDispatch} from 'react-redux'
import {handleOpenSidebar} from 'store/sidebarSlice'

// * supabase
import {supabase} from 'utils/supabaseClient'
import {fetchCurrentUser} from 'utils/Store'

// * framer-motion
import {motion, AnimatePresence} from 'framer-motion'

// * icons
import {TiArrowBackOutline} from 'react-icons/ti'
import {IoMdSettings} from 'react-icons/io'
import {AiOutlineEdit} from 'react-icons/ai'

// * components
import Avatar from 'components/profile/Avatar'
import TheirAvatar from 'components/profile/TheirAvatar'
import UploadPrivatChatImage from 'components/chat/UploadPrivatChatImage'

export default function PrivatChatHeader({chatData}) {
    const [isOpenSettingPrivateChat, setIsOpenSettingPrivateChat] = useState(false)
    const [currentUser, setCurrentUser] = useState({})
    const [creatorUser, setCreatorUser] = useState({})
    const [interlocutorUser, setInterlocutorUser] = useState({})
    const [image_url, setImageUrl] = useState(null)
    const [loading, setLoading] = useState(false)

    const {user} = useSelector(state => state.auth)
    const router = useRouter()

    useEffect(() => {
        if (user !== null) {
            const fetchData = fetchCurrentUser(user.id)
            fetchData.then(data => setCurrentUser(data[0]))
    
            if (chatData) {
                const fetchDataCreator = fetchCurrentUser(chatData.created_by.id)
                fetchDataCreator.then(data => setCreatorUser(data[0]))
    
                const fetchDataInterlocutor = fetchCurrentUser(chatData.interlocutor.id)
                fetchDataInterlocutor.then(data => setInterlocutorUser(data[0]))
            }
        }
    }, [isOpenSettingPrivateChat])

    useEffect(() => {
        setIsOpenSettingPrivateChat(false)
    }, [router.query.id])

    const dispatch = useDispatch()
    const {isOpen} = useSelector(state => state.sidebar)

    async function updatePivatChat({ image_url }) {
        try {
            setLoading(true)
            const user = supabase.auth.user()
    
            const updates = {
                id: router.query.id,
                image: image_url
            }
    
            let { error } = await supabase.from('privat_chats').upsert(updates, {
            returning: 'minimal', // Don't return the value after inserting
            })
    
            if (error) {
            throw error
            }
        } catch (error) {
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }

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

    return (
        <div>
            <div className='z-50 fixed top-0 left-0 right-0 w-full flex justify-center h-14 bg-secondary border-b-2 border-solid border-gray-200 dark:border-gray-800 group shadow'>
                <div 
                    onClick={() => dispatch(handleOpenSidebar())}
                    className='absolute left-4 top-3 w-8 h-8 flex items-center justify-center xl:hidden'>
                    <div className={`w-6 h-[2px] bg-accent after:w-6 after:h-[2px] after:bg-accent after:absolute after:top-2 before:w-4 before:h-[2px] before:bg-accent before:absolute before:bottom-2 ${isOpen ? 'h-0 before:w-6 before:rotate-[45deg] before:bottom-[15px] after:rotate-[-45deg] after:top-[15px] transition-all' : ''} z-50`}>
                    </div>
                </div>
                <motion.div
                    onClick={() => router.push('/main')}
                    className='absolute right-4 xl:left-4 xl:right-[100%] top-4 text-2xl text-secondary cursor-pointer z-50'
                    whileHover={{
                        scale: 1.05
                    }}
                >
                    <TiArrowBackOutline/>
                </motion.div>
                {
                    chatData !== null
                    ?   <div className='flex flex-col items-center'>
                            <div className='flex items-center gap-2 text-primary font-semibold text-2xl'>
                                <h4 className='relative'>
                                    {chatData && chatData.chat_title} 
                                    <span 
                                        onClick={() => setIsOpenSettingPrivateChat(!isOpenSettingPrivateChat)}
                                        className='absolute right-[-30px] bottom-1 group-hover:opacity-100 opacity-100 xl:opacity-0  transition cursor-pointer'
                                    >
                                        <IoMdSettings/>
                                    </span>
                                </h4>
                            </div>
                            <div className='text-secondary text-sm flex items-center gap-2 px-8'>
                                this is privat chat with
                                {user && chatData && user.id === chatData.created_by.id
                                    ? (<h4 className='text-primary font-semibold text-lg'>{chatData && chatData.interlocutor.username || chatData.interlocutor.username_google}</h4>)
                                    : (<h4 className='text-primary font-semibold text-lg'>{chatData && chatData.created_by.user_metadata.username}</h4>)}
                            </div>
                        </div>
                    : ''
                }
            </div>
            <AnimatePresence exitBeforeEnter initial={true}>
                {
                    isOpenSettingPrivateChat && chatData !== null && 
                    <motion.div 
                        className='flex flex-col justify-start items-center py-4 pt-28 w-full h-[500px] bg-primary absolute z-10 border-b-2 border-solid border-gray-200 dark:border-gray-800 shadow'
                        variants={dropIn}
                        initial='before'
                        animate='in'
                        exit='after'

                    >   
                        <div 
                            onClick={() => setIsOpenSettingPrivateChat(!isOpenSettingPrivateChat)}
                            className='w-12 h-6 absolute bottom-2 cursor-pointer'
                        >
                            <div className='after:absolute after:bg-white after:w-6 after:h-1 after:left-1 after:bottom-2 after:rotate-[-40deg] before:absolute before:bg-white before:w-6 before:h-1 before:right-1 before:bottom-2 before:rotate-[40deg]'>
                            </div>
                        </div>
                        <div className='flex flex-col gap-5 items-center w-full'>
                            <div className='flex flex-col items-center'>
                                <UploadPrivatChatImage 
                                    url={image_url}
                                    size={128}
                                    onUpload={(url) => {
                                        setImageUrl(url)
                                        updatePivatChat({image_url: url})
                                    }}
                                    text_size={'6xl'}
                                />
                                {/* {chatData && chatData.chat_title[0].toUpperCase()} */}
                                <div className='relative flex items-center gap-2 text-primary font-semibold text-2xl'>
                                    {chatData && chatData.chat_title}
                                    <span 
                                        className='absolute right-[-30px] cursor-pointer group-hover:opacity-100 opacity-0 transition'
                                    >
                                        <AiOutlineEdit/>
                                    </span>
                                </div>
                            </div>
                            <div className='flex justify-between w-full px-10'>
                                <div className='flex flex-col text-primary gap-4'>
                                    <h4>Creator</h4>
                                    <div className='flex gap-4'>
                                        {
                                            chatData && currentUser.id === interlocutorUser.id
                                            ? <TheirAvatar user_id={chatData && creatorUser.id} size={64} text_size={'xl'}/>
                                            : <Avatar size={64}/>  
                                        }
                                        <div>
                                            <h3 className='font-semibold text-2xl'>   
                                                {
                                                creatorUser && 
                                                creatorUser.username_google ||
                                                creatorUser.username
                                                }
                                            </h3>
                                            <h5>
                                                {
                                                creatorUser && 
                                                creatorUser.email
                                                }
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col items-end text-primary gap-4'>
                                    <h4>interlocutor</h4>
                                    <div className='flex gap-4'>
                                        <div>
                                            <h3 className='font-semibold text-2xl'>   
                                                {
                                                interlocutorUser && 
                                                interlocutorUser.username_google ||
                                                interlocutorUser.username
                                                }
                                            </h3>
                                            <h5>
                                                {
                                                interlocutorUser && 
                                                interlocutorUser.email
                                                }
                                            </h5>
                                        </div>
                                        {
                                            chatData && currentUser.id === interlocutorUser.id
                                            ? <Avatar size={64}/>  
                                            : <TheirAvatar user_id={chatData && interlocutorUser.id} size={64} text_size={'xl'}/>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}