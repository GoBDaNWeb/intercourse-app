// * react/next 
import {memo} from 'react'

// * hooks 
import {useParticipants} from './useParticipants'

// * components
import Avatar from 'components/shared/profile/Avatar'
import TheirAvatar from 'components/shared/profile/TheirAvatar'

export default memo(function Interlocutor () {
    const {
        models: {
            user,
            privatChatData
        }
    } = useParticipants()

    const username = privatChatData.interlocutor?.username_google || privatChatData.interlocutor?.username

    return (
        <div className='flex gap-4'>
            <div>
                <h3 className='font-semibold text-2xl'>   
                    {username}
                </h3>
                <h5>
                    {privatChatData.interlocutor?.email}
                </h5>
            </div>
            {
                user.id === privatChatData.interlocutor?.id
                ? <Avatar size={64}/>  
                : <TheirAvatar 
                    avatar={privatChatData.interlocutor?.avatar} 
                    username={username}
                    size={64} 
                    text_size={'xl'}
                />
            }
        </div>
    )
})

