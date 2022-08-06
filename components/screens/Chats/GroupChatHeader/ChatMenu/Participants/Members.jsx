// * react/next 
import {memo} from 'react'

// * hooks 
import {useParticipants} from './useParticipants'

// * components
import TheirAvatar from 'components/shared/profile/TheirAvatar'

export default memo(function Members() {
    const {
        models: {
            groupChatData
        },
        commands: {
            openProfile
        }
    } = useParticipants()

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
})