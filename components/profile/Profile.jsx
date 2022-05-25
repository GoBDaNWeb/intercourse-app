// * react/next
import {useState} from 'react'
import {useRouter} from 'next/router'

// * redux
import {useDispatch, useSelector} from 'react-redux'
import {signOut} from 'store/authSlice'
import {handleOpenProfile} from 'store/profileSlice'
import {setBgChat} from 'store/chatSlice'

// * supabase
import {updateUserStatus} from 'utils/Store'

// * framer-motion
import {motion} from 'framer-motion'

// * icons
import {AiOutlineClose} from 'react-icons/ai'
import {ImExit} from 'react-icons/im'

// * components
import AvatarUpload from 'components/profile/AvatarUpload'
import Switcher from '/components/Switcher'

export default function Profile() {
    const [loading, setLoading] = useState(false)

    const [avatar_url, setAvatarUrl] = useState(null)

    const dispatch = useDispatch()
    const {isProfileOpen} = useSelector(state => state.profile)
    const {user} = useSelector(state => state.auth)
    const {bgChat} = useSelector(state => state.chat)

    const router = useRouter()

    // ** записываем bg чата в localStorage
    const setBgChatTheme = (bg) => {
        localStorage.setItem('bgChat', bg);
        dispatch(setBgChat(bg))
    }

    // ** функция выхода из аккаунта
    const signOutFunc = () => {
        updateUserStatus(user.id, 'OFFLINE')
        dispatch(signOut())
        router.push('/')
    }

    // ? Не реадизованно
    async function updateProfile({ avatar_url }) {
        try {
          setLoading(true)
          const user = supabase.auth.user()
    
          const updates = {
            id: user.id,
            avatar_url,
            updated_at: new Date(),
          }
    
          let { error } = await supabase.from('users').upsert(updates, {
            returning: 'minimal', // Don't return the value after inserting
          })
    
          if (error) {
            throw error
          }
        } catch (error) {
          alert(error.message)
        } finally {
          setLoading(false)
        }
    }
        

    return(
        <div>
            {
                isProfileOpen
                && 
                <div className='flex flex-col items-center py-10 justify-center w-full '>
                    <div className='flex flex-col items-center'>
                        <AvatarUpload
                            url={avatar_url}
                            size={208}
                            onUpload={(url) => {
                                setAvatarUrl(url)
                                updateProfile({ avatar_url: url })
                            }}
                        />
                        <div className='text-center mt-2'>
                            <h2 className='font-semibold text-4xl text-primary'>
                                { user !== null &&
                                    user.user_metadata.name
                                    ? user !== null && user.user_metadata.name
                                    : user !== null && user.user_metadata.username
                                }
                            </h2>
                            <h4 className='text-secondary'>
                                {user !== null && user.email}
                            </h4>
                        </div>
                        <div>
                            <Switcher/>
                        </div>
                    <div className='relative bg-primary w-full h-full rounded-2xl mt-4 overflow-y-auto overflow-x-hidden custom-scroll'>
                        <motion.div 
                            className='flex flex-col items-center mt-6 w-full h-full'
                        >
                            <h4 className='font-semibold text-primary'>select chat theme</h4>
                            <div className='flex flex-wrap gap-2 text-center justify-center text-secondary'>
                                <div 
                                    onClick={() => setBgChatTheme('standart')} 
                                    className='cursor-pointer flex flex-col items-center gap-2 rounded-xl bg-black bg-opacity-40 p-2 h-24'
                                >
                                    <div className=' w-12 h-12 rounded-xl bg-chat-standart cursor-pointer border-2 border-solid border-gray-200 dark:border-gray-800'></div>
                                    <div className={`w-4 h-4 rounded-full transition-all duration-[0.3s] ${bgChat === 'standart' ? 'bg-green-500' : 'bg-white'}`}></div>
                                </div>
                                <div 
                                    onClick={() => setBgChatTheme('galaxy')}
                                    className='cursor-pointer flex flex-col items-center gap-2 rounded-xl bg-black bg-opacity-40 p-2 h-24'
                                >
                                    <div className='w-12 h-12 rounded-xl bg-chat-galaxy cursor-pointer'></div>
                                    <div className={`w-4 h-4 rounded-full transition-all duration-[0.3s] ${bgChat === 'galaxy' ? 'bg-green-500' : 'bg-white'}`}></div>
                                </div>
                                <div 
                                    onClick={() => setBgChatTheme('ocean')}
                                    className='cursor-pointer flex flex-col items-center gap-2 rounded-xl bg-black bg-opacity-40 p-2 h-24'
                                >
                                    <div className='w-12 h-12 rounded-xl bg-chat-ocean cursor-pointer'></div>
                                    <div className={`w-4 h-4 rounded-full transition-all duration-[0.3s] ${bgChat === 'ocean' ? 'bg-green-500' : 'bg-white'}`}></div>
                                </div>
                                <div 
                                    onClick={() => setBgChatTheme('sunset')}
                                    className='cursor-pointer flex flex-col items-center gap-2 rounded-xl bg-black bg-opacity-40 p-2 h-24'
                                >
                                    <div className='w-12 h-12 rounded-xl bg-chat-sunset cursor-pointer'></div>
                                    <div className={`w-4 h-4 rounded-full transition-all duration-[0.3s] ${bgChat === 'sunset' ? 'bg-green-500' : 'bg-white'}`}></div>
                                </div>
                                <div 
                                    onClick={() => setBgChatTheme('emerald')}
                                    className='cursor-pointer flex flex-col items-center gap-2 rounded-xl bg-black bg-opacity-40 p-2 h-24'
                                >
                                    <div className='w-12 h-12 rounded-xl bg-chat-emerald cursor-pointer'></div>
                                    <div className={`w-4 h-4 rounded-full transition-all duration-[0.3s] ${bgChat === 'emerald' ? 'bg-green-500' : 'bg-white'}`}></div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                    </div>
                    <div 
                        onClick={() => dispatch(handleOpenProfile())}
                        className='absolute right-2 top-6 text-2xl text-primary cursor-pointer'
                    >
                        <AiOutlineClose/>
                    </div>
                    <button 
                        onClick={() => signOutFunc()}
                        className='absolute top-6 left-2 text-3xl pl-2 text-primary'
                    >
                        <ImExit/>
                    </button>
                </div>
            }
        </div>
    )
}