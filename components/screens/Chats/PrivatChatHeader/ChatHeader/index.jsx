import {memo} from 'react'

// * hooks 
import {useChatHeader} from './useChatHeader'

// * framer-motion
import {motion} from 'framer-motion'

// * icons
import {TiArrowBackOutline} from 'react-icons/ti'

// * components
import Burger from 'components/shared/Burger'
import HeaderContent from './HeaderContent'

export default memo(function ChatHeader() {
    const {
        models: {
            privatChatData
        },
        commands: {
            redirectToMain
        }
    } = useChatHeader()

    return (
        <div className='z-50 fixed top-0 left-0 right-0 w-full flex justify-center h-14 bg-secondary border-b-2 border-solid border-gray-200 dark:border-gray-800 group shadow'>
            <Burger/>
            <motion.div
                onClick={redirectToMain}
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
})