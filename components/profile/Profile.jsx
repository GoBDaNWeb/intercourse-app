import PreviewProfileUser from 'components/profile/PreviewProfileUser'
import {useDispatch, useSelector} from 'react-redux'
import {AiOutlineClose, AiFillCamera} from 'react-icons/ai'
import {updateUserStatus, fetchCurrentUser} from 'utils/Store'
import {handleOpenProfile} from 'store/profileSlice'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {setBgChat} from 'store/chatSlice'
import {supabase} from 'utils/supabaseClient'
import AvatarUpload from 'components/profile/AvatarUpload'
import {ImExit} from 'react-icons/im'
import {signOut} from 'store/authSlice'
import Switcher from '/components/Switcher'

export default function Profile() {
    const [loading, setLoading] = useState(true)
    const [avatar_url, setAvatarUrl] = useState(null)

    const dispatch = useDispatch()
    const {isProfileOpen} = useSelector(state => state.profile)
    const {user} = useSelector(state => state.auth)
    const {bgChat} = useSelector(state => state.chat)

    const router = useRouter()

    const setBgChatTheme = (bg) => {
        localStorage.setItem('bgChat', bg);
        dispatch(setBgChat(bg))
    }

    const signOutFunc = () => {
        const data = updateUserStatus(user.id, 'OFFLINE')
        data.then(item => {
            setUserStatus(item)
        })
        dispatch(signOut())
        router.push('/')
    }

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
                <div className='flex flex-col items-center py-10 justify-center w-full'>
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
                    <div className='flex flex-col items-center mt-6'>
                        <h4 className='font-semibold text-primary'>select chat theme</h4>
                        <div className='flex gap-5 text-center justify-center text-secondary'>
                            <div 
                                onClick={() => setBgChatTheme('standart')} 
                                className='flex flex-col items-center'
                            >
                                <div className=' w-12 h-12 rounded-xl bg-chat-standart cursor-pointer border-2 border-solid border-gray-200 dark:border-gray-800'></div>
                                <h6>standart</h6>
                            </div>
                            <div 
                                onClick={() => setBgChatTheme('galaxy')}
                                className='flex flex-col items-center'
                            >
                                <div className='w-12 h-12 rounded-xl bg-chat-galaxy cursor-pointer'></div>
                                <h6>galaxy</h6>
                            </div>
                            <div 
                                onClick={() => setBgChatTheme('ocean')}
                                className='flex flex-col items-center'
                            >
                                <div className='w-12 h-12 rounded-xl bg-chat-ocean cursor-pointer'></div>
                                <h6>ocean</h6>
                            </div>
                            <div 
                                onClick={() => setBgChatTheme('sunset')}
                                className='flex flex-col items-center'
                            >
                                <div className='w-12 h-12 rounded-xl bg-chat-sunset cursor-pointer'></div>
                                <h6>sunset</h6>
                            </div>
                            <div 
                                onClick={() => setBgChatTheme('emerald')}
                                className='flex flex-col items-center'
                            >
                                <div className='w-12 h-12 rounded-xl bg-chat-emerald cursor-pointer'></div>
                                <h6>emerald</h6>
                            </div>
                        </div>
                        <div className='flex flex-col items-center mt-4'>
                            <h4 className='font-semibold text-primary'>current theme</h4>
                            <div className={`w-12 h-12 rounded-xl bg-chat-${bgChat} cursor-pointer`}></div>
                            <h6 className='text-secondary'>
                                {
                                    bgChat
                                }
                            </h6>
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