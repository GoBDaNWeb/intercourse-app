import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {ImExit} from 'react-icons/im'
import {IoMdSettings} from 'react-icons/io'
import {signOut} from 'store/authSlice'
import {useRouter} from 'next/router'
import {updateUserStatus, fetchCurrentUser} from 'utils/Store'
import {supabase} from 'utils/supabaseClient'
import {motion} from 'framer-motion'
import {handleOpenProfile} from 'store/profileSlice'
import Avatar from 'components/profile/Avatar'

export default function PreviewProfileUser() {
    const [currentUser, setCurrentUser] = useState(null)

    const {user} = useSelector(state => state.auth)
    const {isProfileOpen} = useSelector(state => state.profile)
    
    useEffect(() => {
        if (user !== null) {
           const current = fetchCurrentUser(user.id)
           current.then(data => setCurrentUser(data[0]))
        }
    }, [user])

    const router = useRouter()

    const dispatch = useDispatch()

    const signOutFunc = () => {
        const data = updateUserStatus(user.id, 'OFFLINE')
        // data.then(item => {
        //     setUserStatus(item)
        // })
        dispatch(signOut())
        router.push('/')
    }

    return (
        <div className={`flex items-center justify-center gap-4 group py-2 transition ${isProfileOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            {currentUser !== null 
                ? <Avatar
                    size={64}
                    >
                      <div 
                            onClick={() => dispatch(handleOpenProfile())}
                            className='absolute flex justify-center text-xl items-center w-8 h-8 bg-accent rounded-full -top-2 -right-2 border-2 border-solid border-white dark:border-[#283141] cursor-pointer opacity-0 group-hover:opacity-100 transition'
                        >
                            <IoMdSettings/>
                        </div>  
                </Avatar>
                    : <div className='relative flex justify-center text-3xl font-bold text-accent items-center w-16 h-16 grad-1 rounded-full '>
                    <div 
                        onClick={() => dispatch(handleOpenProfile())}
                        className=' absolute flex justify-center text-xl items-center w-8 h-8 bg-secondary rounded-full -top-2 -right-2 border-2 border-solid border-white  cursor-pointer opacity-0 group-hover:opacity-100 transition'
                    >
                        <IoMdSettings/>
                    </div>
                    { user !== null && 
                        user.user_metadata.name
                            ? user !== null && user.user_metadata.name[0].toUpperCase()
                            : user !== null && user.user_metadata.username[0].toUpperCase()
                        
                    }
                </div> 
            }
           
            <div>
                <h2 className='font-semibold text-2xl text-primary'>
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
            <button 
                onClick={() => signOutFunc()}
                className='text-3xl pl-2 text-primary'
            >
                <ImExit/>
            </button>
        </div>
    )
}