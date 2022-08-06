// * react/next 
import {memo} from 'react'

// * hooks
import {useParticipants} from './useParticipants'

// * components
import TheirAvatar from 'components/shared/profile/TheirAvatar'

export default memo(function Creator() {
    const {
        models: {
            creatorUser
        },
        commands: {
            openProfile
        }
    } = useParticipants()

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
})