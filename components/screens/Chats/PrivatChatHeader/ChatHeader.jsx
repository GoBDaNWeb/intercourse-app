// * react/next
import { memo, useContext } from 'react'
import {useRouter} from 'next/router'
import PrivatChatContext from 'context/PrivatChat/PrivatChatContext'

// * redux
import {useSelector } from 'react-redux'

// * framer-motion
import {motion} from 'framer-motion'

// * icons
import {TiArrowBackOutline} from 'react-icons/ti'
import {IoMdSettings} from 'react-icons/io'

// * components
import Burger from 'components/shared/Burger'

export default function ChatHeader() {
    const router = useRouter()
    const {privatChatData} = useContext(PrivatChatContext)

    return (
        <div className='z-50 fixed top-0 left-0 right-0 w-full flex justify-center h-14 bg-secondary border-b-2 border-solid border-gray-200 dark:border-gray-800 group shadow'>
            <Burger/>
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
                privatChatData
                ?  <HeaderContent />
                : null
            }
        </div>
    )
}

const HeaderContent = memo(() => {
    const {user} = useSelector(state => state.auth)
    const {isOpenMenu, setIsOpenMenu, privatChatData} = useContext(PrivatChatContext)

    return (
        <div className='flex flex-col items-center'>
            <div className='flex items-center gap-2 text-primary font-semibold text-2xl'>
                <h4 className='relative'>
                    {privatChatData?.chat_title} 
                    <span 
                        onClick={() => setIsOpenMenu(!isOpenMenu)}
                        className='absolute right-[-30px] bottom-1 group-hover:opacity-100 opacity-100 xl:opacity-0  transition cursor-pointer'
                    >
                        <IoMdSettings/>
                    </span>
                </h4>
            </div>
            <div className='text-secondary text-sm flex items-center gap-2 px-8'>
                this is privat chat with
                {
                    user && privatChatData && user.id === privatChatData?.created_by?.id
                    ? (
                        <h4 className='text-primary font-semibold text-lg'>
                            {privatChatData?.interlocutor.username || privatChatData?.interlocutor.username_google}
                        </h4>
                    ) : (
                        <h4 className='text-primary font-semibold text-lg'>
                            {privatChatData?.created_by?.user_metadata.username}
                        </h4>
                    )
                }
            </div>
        </div>
    )
})