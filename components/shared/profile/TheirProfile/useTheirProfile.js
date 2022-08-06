// * react/next
import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'

// * redux
import {useSelector, useDispatch} from 'react-redux'
import {handleOpenTheirProfile} from 'store/profileSlice'

// * supabase
import {fetchCurrentUser, fetchUserAvatar} from 'supabase/modules/user'
import {addPrivatChat} from 'supabase/modules/chat'

export function useTheirProfile() {
    const [avatarUrl, setAvatarUrl] = useState('')
    const [currentUser, setCurrentUser] = useState(null)
    const [chatTitle, setChatTitle] = useState('false')

    const router = useRouter()

    const {theirProfileData} = useSelector(state => state.profile)
    const {user} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    // ** при изменении theirProfileData получаем конкретный аватар
    useEffect(() => {
        const responseUserData = fetchCurrentUser(theirProfileData)
        responseUserData.then(data => setCurrentUser(data[0]))

        const responseUserAvatar = fetchUserAvatar(theirProfileData)
        responseUserAvatar.then(data => setAvatarUrl(data[0].avatar))
    }, [theirProfileData])

    // ** функция создания нового чата
    const newChat = () => {
        const randomId = len => Math.random().toString(36).substr(3, len);
        const id = randomId(15);
        addPrivatChat(id, user, currentUser, chatTitle)
        router.push({pathname:'/chats/[id]', query: {type: 'p', id: `${id}`}})
    }

    // ** записывает изменения в переменную
    const onChange = (e) => {
        const {value} = e.target
        setChatTitle(value)
    }

    const handleOpenTheirProfileFunc = () => {
        dispatch(handleOpenTheirProfile())
    }
 
    const username = currentUser?.username ? currentUser?.username : currentUser?.username_google


    return {
        models: {
            avatarUrl,
            currentUser,
            chatTitle,
            username
        },
        commands: {
            newChat,
            onChange,
            handleOpenTheirProfileFunc
        }
    }
}