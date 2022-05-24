import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {useTranslation} from 'next-i18next'

// * redux
import {useDispatch, useSelector} from 'react-redux'
import {signOut} from 'store/authSlice'
import {handleOpenProfile} from 'store/profileSlice'
import {setBgChat} from 'store/chatSlice'

// * supabase
import {updateUserStatus} from 'utils/Store'

// * framer-motion
import {motion, AnimatePresence} from 'framer-motion'

// * icons
import {AiOutlineClose, AiOutlineStar} from 'react-icons/ai'
import {BiBrush} from 'react-icons/bi'
import {MdLanguage} from 'react-icons/md'
import {ImExit} from 'react-icons/im'

// * components
import AvatarUpload from 'components/profile/AvatarUpload'
import Switcher from '/components/Switcher'

export default function Profile() {
    const [selectChatTheme, handleSelectChatTheme] = useState(false)
    const [selectLanguage, handleSelectLanguage] = useState(false)
    const [loading, setLoading] = useState(false)

    const [avatar_url, setAvatarUrl] = useState(null)

    const {t} = useTranslation('common')

    const dispatch = useDispatch()
    const {isProfileOpen} = useSelector(state => state.profile)
    const {user} = useSelector(state => state.auth)
    const {bgChat} = useSelector(state => state.chat)

    const router = useRouter()

    const { asPath} = router

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

    const handleOpenSettingType = (type) => {
         if (type === 'chat-theme') {
           
            handleSelectChatTheme(true)
            handleSelectLanguage(false)
        } else if (type === 'language') {
         
            handleSelectChatTheme(false)
            handleSelectLanguage(true)
        }
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
                        <ul className='flex flex-col items-start text-primary w-full p-8 rounded-2xl mt-4'>
                            <li 
                                onClick={() => handleOpenSettingType('chat-theme')}
                                className='flex gap-1 items-center cursor-pointer mb-1'
                            >
                                <span className='text-xl'>
                                    <BiBrush/>
                                </span>
                                {t('sidebar.chat-theme')} 
                            </li>
                            <li 
                                onClick={() => handleOpenSettingType('language')}
                                className='flex gap-1 items-center cursor-pointer mb-1'
                            >
                                <span className='text-xl'>
                                <MdLanguage/>
                                </span>
                                {t('sidebar.language')}
                            </li>
                        </ul>
                    <div className='relative bg-primary w-full h-full rounded-2xl mt-4 overflow-y-auto overflow-x-hidden custom-scroll'>
                        <AnimatePresence exitBeforeEnter>
                            {
                                selectChatTheme &&
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
                            }
                        </AnimatePresence>
                        <AnimatePresence exitBeforeEnter>
                            {
                                selectLanguage &&
                                <motion.div 
                                    className='flex flex-col items-center mt-6'
                                >
                                    <div className='text-primary'>
                                        <h4 
                                            onClick={() => router.push({asPath}, {asPath}, {locale: 'ru'})}
                                            className='cursor-pointer'
                                        >
                                            {t('language.ru')}
                                        </h4>
                                        <h4 
                                            onClick={() => router.push({asPath}, {asPath}, {locale: 'en'})}
                                            className='cursor-pointer'
                                        >
                                            {t('language.en')}
                                        </h4>
                                    </div>
                                </motion.div>
                            }
                        </AnimatePresence>
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