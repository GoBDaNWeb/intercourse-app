// * react/next
import {useContext} from 'react'
import GroupChatContext from 'context/GroupChat/GroupChatContext'

// * redux
import {useSelector} from 'react-redux'
import {setTheirProfileData, handleOpenTheirProfile} from 'store/profileSlice'

// * components
import TheirAvatar from 'components/shared/profile/TheirAvatar'

export default function Participants() {
    const {groupChatData} = useContext(GroupChatContext)

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
                                avatar={user.avatar}
                                usaername={user.username || user.username_google}
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