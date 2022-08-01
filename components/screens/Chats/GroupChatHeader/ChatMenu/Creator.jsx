// * react/next
import {useState, useEffect, useContext} from 'react'
import GroupChatContext from 'context/GroupChat/GroupChatContext'

// * redux
import {useSelector} from 'react-redux'
import {setTheirProfileData, handleOpenTheirProfile} from 'store/profileSlice'

// * supabase
import {fetchCurrentUser} from 'supabase/modules/user'

// * components
import TheirAvatar from 'components/shared/profile/TheirAvatar'


export default function Creator() {
    const [creatorUser, setCreatorUser] = useState(null)

    const {isOpenMenu, groupChatData} = useContext(GroupChatContext)

    const {user} = useSelector(state => state.auth)
    const {isTheirProfileOpen} = useSelector(state => state.profile)

    useEffect(() => {
        if (user !== null && groupChatData) {
            const fetchDataCreator = fetchCurrentUser(groupChatData?.created_by?.id)
            fetchDataCreator.then(data => setCreatorUser(data[0]))
        }
    }, [isOpenMenu])

    const openProfile = () => {
        dispatch(setTheirProfileData(user.id))
        if (!isTheirProfileOpen) {
            dispatch(handleOpenTheirProfile())
        }
    }

    const username = creatorUser?.username || creatorUser?.username_google

    return (
        <div className='flex flex-col gap-2'>
            <h3 className='text-primary'>creator</h3>
            <div className='flex gap-2'>
                <div
                    onClick={openProfile}
                    className='cursor-pointer'
                >
                    <TheirAvatar
                        avatar={creatorUser?.avatar}
                        username={username}
                        size={64}
                        text_size={'xl'}
                    />
                </div>
                <div className='flex flex-col text-primary'>
                    <h3 className='font-semibold text-2xl'>   
                        {username}
                    </h3>
                    <h5>
                        {creatorUser?.email}
                    </h5>
                </div>
            </div>
        </div>
    )
}