// * react/next
import { useContext } from 'react'
import PrivatChatContext from 'context/PrivatChat/PrivatChatContext'

// * redux 
import {useSelector} from 'react-redux'

// * components
import Avatar from 'components/shared/profile/Avatar'
import TheirAvatar from 'components/shared/profile/TheirAvatar'

export default function Interlocutor () {
    const {privatChatData} = useContext(PrivatChatContext)
    const {user} = useSelector(state => state.auth)
    const username = privatChatData.interlocutor.username_google || privatChatData.interlocutor.username

    return (
        <div className='flex gap-4'>
            <div>
                <h3 className='font-semibold text-2xl'>   
                    {username}
                </h3>
                <h5>
                    {privatChatData.interlocutor.email}
                </h5>
            </div>
            {
                user.id === privatChatData.interlocutor.id
                ? <Avatar size={64}/>  
                : <TheirAvatar 
                    avatar={privatChatData.interlocutor.avatar} 
                    username={username}
                    size={64} 
                    text_size={'xl'}
                />
            }
        </div>
    )
}

