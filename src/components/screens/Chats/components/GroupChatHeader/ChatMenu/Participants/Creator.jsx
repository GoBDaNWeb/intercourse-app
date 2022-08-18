// * react/next 
import {useEffect, useState, memo} from 'react'

// * redux 
import {useSelector, useDispatch} from 'react-redux'
import {setTheirProfileData, handleOpenTheirProfile} from 'store/profileSlice'

// * supabase 
import {fetchCurrentUser} from 'supabase/modules/user'

// * components
import Avatar from 'components/common/Avatar'

const Creator = memo(() => {
    const [creatorUser, setCreatorUser] = useState(null)

    const dispatch = useDispatch()

    const {user} = useSelector(state => state.auth)
    const {groupChatData} = useSelector(state => state.chat)
    const {isTheirProfileOpen} = useSelector(state => state.profile)

    const openProfile = () => {
        dispatch(setTheirProfileData(user.id))
        !isTheirProfileOpen && dispatch(handleOpenTheirProfile())
    }

    const fetchCreatorUser = async () => {
        const response = await fetchCurrentUser(groupChatData?.created_by.id)
        setCreatorUser(response[0])
    }

    useEffect(() => {
        fetchCreatorUser()
    }, [groupChatData, user])

    const username = creatorUser?.username || creatorUser?.username_google

    return (
        <div className='flex flex-col gap-2'>
            <h3 className='text-primary'>creator</h3>
            <div className='flex gap-2'>
                <div
                    onClick={openProfile}
                    className='cursor-pointer'
                >
                    <Avatar
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
})

Creator.displayName = 'Creator';

export default Creator