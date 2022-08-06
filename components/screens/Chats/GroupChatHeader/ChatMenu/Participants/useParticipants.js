// * react/next
import { useState, useEffect} from 'react'

// * redux 
import {useSelector, useDispatch} from 'react-redux'

// * supabase 
import {fetchCurrentUser} from 'supabase/modules/user'


export function useParticipants() {
    const [creatorUser, setCreatorUser] = useState(null)

    const dispatch = useDispatch()

    const {user} = useSelector(state => state.auth)
    const {isTheirProfileOpen} = useSelector(state => state.profile)
    const {groupChatData} = useSelector(state => state.chat)

    useEffect(() => {
        if (user !== null && groupChatData && groupChatData.created_by) {
            const fetchDataCreator = fetchCurrentUser(groupChatData.created_by.id)
            fetchDataCreator.then(data => data && setCreatorUser(data[0]))
        }
    }, [groupChatData])

    const openProfile = () => {
        dispatch(setTheirProfileData(user.id))
        if (!isTheirProfileOpen) {
            dispatch(handleOpenTheirProfile())
        }
    }

    return {
        models: {
            groupChatData,
            creatorUser
        },
        commands: {
            openProfile
        }
    }
}