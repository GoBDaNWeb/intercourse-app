// * react/next
import { useState, useEffect, useContext } from 'react'
import PrivatChatContext from 'context/PrivatChat/PrivatChatContext'

// * redux 
import {useSelector} from 'react-redux'

// * supabase
import {fetchCurrentUser} from 'utils/Store'

// * components
import Creator from './Creator'
import Interlocutor from './Interlocutor'

export default function Participants() {
    const [currentUser, setCurrentUser] = useState(null)
    const [creatorUser, setCreatorUser] = useState(null)
    const [interlocutorUser, setInterlocutorUser] = useState(null)

    const {isOpenMenu, privatChatData} = useContext(PrivatChatContext)
    const {user} = useSelector(state => state.auth)

    useEffect(() => {
        if (user !== null) {
            const fetchData = fetchCurrentUser(user.id)
            fetchData.then(data => setCurrentUser(data[0]))
    
            const fetchDataCreator = fetchCurrentUser(privatChatData?.created_by.id)
            fetchDataCreator.then(data => setCreatorUser(data[0]))

            const fetchDataInterlocutor = fetchCurrentUser(privatChatData?.interlocutor.id)
            fetchDataInterlocutor.then(data => setInterlocutorUser(data[0]))
        }
    }, [isOpenMenu])
    
    return (
        <div className='flex justify-between w-full px-10'>
            <div className='flex flex-col text-primary gap-4'>
                <h4>Creator</h4>
                <Creator
                    currentUser={currentUser}
                    creatorUser={creatorUser}
                    interlocutorUser={interlocutorUser}
                />
            </div>
            <div className='flex flex-col items-end text-primary gap-4'>
                <h4>interlocutor</h4>
                <Interlocutor
                    currentUser={currentUser}
                    interlocutorUser={interlocutorUser}
                />
            </div>
        </div>
    )
}