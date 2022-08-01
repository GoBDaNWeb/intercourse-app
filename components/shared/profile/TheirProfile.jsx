// * react/next
import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'

// * redux
import {useSelector, useDispatch} from 'react-redux'
import {handleOpenTheirProfile} from 'store/profileSlice'

// * supabase
import {fetchCurrentUser} from 'utils/Store'
import {addPrivatChat, fetchUserAvatar} from 'utils/Store'

// * supabase
import {AiOutlineClose} from 'react-icons/ai'

// * components
import TheirAvatar from 'components/shared/profile/TheirAvatar'

export default function TheirProfile() {
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
 
    const username = currentUser?.username ? currentUser?.username : currentUser?.username_google

    return (
        <div>
            <div className='flex flex-col items-center py-10 justify-center w-full'>
                <TheirAvatar
                    avatar={avatarUrl}
                    size={208}
                    text_size={'7xl'}
                />
                <div className='text-center mt-2'>
                    <h2 className='font-semibold text-4xl text-primary'>
                        { username}
                    </h2>
                    <h4 className='text-secondary'>
                        {currentUser?.email}
                    </h4>
                </div>
                <div className='mt-10 flex flex-col items-center text-primary'>
                    <h5 className='font-semibold'>
                        you can create a privat chat with this user
                    </h5>
                    <div 
                            className='flex flex-col items-center gap-2'
                        >
                        <input 
                            onChange={(e) => onChange(e)}
                            className='text-primary bg-primary outline-none px-4 py-2 rounded-[20px] border-2 border-solid border-gray-200 dark:border-gray-800 bg-opacity-80'
                            placeholder='enter title'
                            type="text"
                        />
                        <button
                            disabled={!chatTitle.length}
                            onClick={() => newChat()}
                            className='text-accent text-xl bg-accent px-4 rounded-full bg-opacity-80 disabled:opacity-50 disabled:pointer-events-none'
                        >
                            create
                        </button>
                    </div>
                </div>
                <div 
                    onClick={() => dispatch(handleOpenTheirProfile())}
                    className='absolute right-2 top-6 text-2xl text-primary cursor-pointer'
                >
                    <AiOutlineClose/>
                </div>
            </div>
        </div>
    )
}