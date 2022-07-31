// * react/next
import {useState, useEffect, useContext} from 'react'
import {useRouter} from 'next/router'
import GroupChatContext from 'context/GroupChat/GroupChatContext'

// * redux
import {useSelector, useDispatch} from 'react-redux'
import {handleOpenSidebar} from 'store/sidebarSlice'
import {setTheirProfileData, handleOpenTheirProfile} from 'store/profileSlice'

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
import TheirAvatar from 'components/shared/profile/TheirAvatar'
import ChatMenuContent from './ChatMenuContent'
import Creator from './Creator'

export default function Participants() {
    const {isOpenMenu, groupChatData} = useContext(GroupChatContext)

    const {isTheirProfileOpen} = useSelector(state => state.profile)

    const openProfile = () => {
        dispatch(setTheirProfileData(user.id))
        if (!isTheirProfileOpen) {
            dispatch(handleOpenTheirProfile())
        }
    }

    return (
        <div className='flex flex-col justify-between w-full px-10 gap-3'>
            {
                groupChatData?.members?.map((user, index) => (
                    <div key={index} className='flex gap-2'>
                        <div
                            onClick={openProfile}
                            className='cursor-pointer'
                        >
                            <TheirAvatar
                                user_id={user.id}
                                size={64}
                                text_size={'xl'}
                            />
                        </div>
                        <div className='flex flex-col text-primary'>
                            <h3 className='font-semibold text-2xl'>   
                                {user.username || user.username_google}
                            </h3>
                            <h5>
                                {user.email}
                            </h5>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}