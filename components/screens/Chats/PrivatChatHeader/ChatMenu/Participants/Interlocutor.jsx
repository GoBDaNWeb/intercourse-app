// * react/next
import { useContext } from 'react'
import PrivatChatContext from 'context/PrivatChat/PrivatChatContext'

// * components
import Avatar from 'components/shared/profile/Avatar'
import TheirAvatar from 'components/shared/profile/TheirAvatar'

export default function Interlocutor ({currentUser, interlocutorUser}) {
    const {privatChatData} = useContext(PrivatChatContext)

    return (
        <div className='flex gap-4'>
            <div>
                <h3 className='font-semibold text-2xl'>   
                    {
                        interlocutorUser?.username_google 
                        || interlocutorUser?.username
                    }
                </h3>
                <h5>
                    {
                        interlocutorUser?.email
                    }
                </h5>
            </div>
            {
                privatChatData && interlocutorUser && currentUser?.id === interlocutorUser?.id
                ? <Avatar size={64}/>  
                : <TheirAvatar 
                    user_id={privatChatData && interlocutorUser?.id} 
                    size={64} 
                    text_size={'xl'}
                />
            }
        </div>
    )
}

