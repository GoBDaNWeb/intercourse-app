// * react/next
import { useContext } from 'react'
import PrivatChatContext from 'context/PrivatChat/PrivatChatContext'

// * components
import Avatar from 'components/shared/profile/Avatar'
import TheirAvatar from 'components/shared/profile/TheirAvatar'

export default function Creator({currentUser, creatorUser, interlocutorUser}) {
    const {privatChatData} = useContext(PrivatChatContext)

    return (
        <div className='flex gap-4'>
            {
                privatChatData && currentUser?.id === interlocutorUser?.id
                ? <TheirAvatar 
                    user_id={privatChatData && creatorUser?.id} 
                    size={64} 
                    text_size={'xl'}
                    />
                : <Avatar size={64}/>  
            }
            <div>
                <h3 className='font-semibold text-2xl'>   
                    {
                        creatorUser?.username_google 
                        || creatorUser?.username
                    }
                </h3>
                <h5>
                    {
                        creatorUser?.email
                    }
                </h5>
            </div>
        </div>
    )
}
