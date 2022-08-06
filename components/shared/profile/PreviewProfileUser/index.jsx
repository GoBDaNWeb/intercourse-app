// * hooks 
import {usePreviewProfileUser} from './usePreviewProfileUser'

// * icons
import {ImExit} from 'react-icons/im'
import {IoMdSettings} from 'react-icons/io'

// * components
import Avatar from 'components/shared/profile/Avatar'

export default function PreviewProfileUser() {
    const {
        models: {
            isProfileOpen,
            user,
            username
        },
        commands: {
            handleSignOut,
            openProfile
        }
    } = usePreviewProfileUser()

    return (
        <div className={`flex items-center justify-center gap-4 group py-2 transition ${isProfileOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'} `}>
            <Avatar size={64}>
                <div 
                    onClick={openProfile}
                    className='absolute flex justify-center text-xl items-center w-8 h-8 bg-accent rounded-full -top-2 -right-2 border-2 border-solid border-white dark:border-[#283141] cursor-pointer opacity-0 group-hover:opacity-100 transition'
                >
                    <IoMdSettings/>
                </div>  
            </Avatar>
            <div className='w-[60%]'>
                <h2 className='font-semibold text-[3.4vw] xl:text-[1.4vw] sm:text-[2.4vw] md:text-[1.8vw] text-primary'>
                    {username}
                </h2>
                <h4 className='text-secondary text-[3vw] xl:text-[1vw] sm:text-[2vw] md:text-[1.4vw]'>
                    {user?.email}
                </h4>
            </div>
            <button 
                onClick={handleSignOut}
                className='text-3xl pl-2 text-primary'
            >
                <ImExit/>
            </button>
        </div>
    )
}