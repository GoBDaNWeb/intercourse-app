// * react/next 
import {memo} from 'react'

// * hooks 
import {useParticipants} from './useParticipants'

// * components
import Avatar from 'components/shared/profile/Avatar'
import TheirAvatar from 'components/shared/profile/TheirAvatar'

export default memo(function Creator() {
    const {
        models: {
            user,
            privatChatData
        }
    } = useParticipants()
    const username = privatChatData.created_by.user_metadata.username_google || privatChatData.created_by.user_metadata.username

    return (
        <div className='flex gap-4'>
            {
                user?.id === privatChatData.interlocutor.id
                ? <TheirAvatar 
                    avatar={privatChatData.created_by.avatar} 
                    username={username}
                    size={64} 
                    text_size={'xl'}
                    />
                : <Avatar size={64}/>  
            }
            <div>
                <h3 className='font-semibold text-2xl'>   
                    {username}
                </h3>
                <h5>
                    {privatChatData.created_by.email}
                </h5>
            </div>
        </div>
    )
})
