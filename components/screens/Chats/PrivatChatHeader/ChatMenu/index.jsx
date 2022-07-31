// * react/next
import { useState, useContext } from 'react'
import PrivatChatContext from 'context/PrivatChat/PrivatChatContext'

// * redux
import {useSelector} from 'react-redux'

// * supabase
import {supabase} from 'utils/supabaseClient'

// * framer-motion
import {motion, AnimatePresence} from 'framer-motion'

// * icons
import {AiOutlineEdit} from 'react-icons/ai'

// * components
import UploadPrivatChatImage from 'components/shared/chat/UploadPrivatChatImage'
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
    const [image_url, setImageUrl] = useState(null)
    const [loading, setLoading] = useState(false)


    const {isOpenMenu, setIsOpenMenu, privatChatData} = useContext(PrivatChatContext)    

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
    
    return (
        <AnimatePresence exitBeforeEnter initial={true}>
            {
                isOpenMenu && privatChatData 
                ? <motion.div 
                    className='flex flex-col justify-start items-center py-4 pt-28 w-full h-[500px] bg-primary absolute z-10 border-b-2 border-solid border-gray-200 dark:border-gray-800 shadow'
                    variants={dropIn}
                    initial='before'
                    animate='in'
                    exit='after'

                >   
                    <div 
                        onClick={() => setIsOpenMenu(!isOpenMenu)}
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
                                {privatChatData?.chat_title}
                                <span 
                                    className='absolute right-[-30px] cursor-pointer group-hover:opacity-100 opacity-0 transition'
                                >
                                    <AiOutlineEdit/>
                                </span>
                            </div>
                        </div>
                        <Participants/>
                    </div>
                </motion.div>
                : null
            }
        </AnimatePresence>
    )
}