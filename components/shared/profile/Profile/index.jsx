// * react/next
import {memo} from 'react'

// * hooks 
import {useProfile} from './useProfile'

// * components
import AvatarUpload from 'components/shared/profile/Profile/AvatarUpload'
import Switcher from '/components/shared/Switcher'
import ThemePicker from './ThemePicker'
import Buttons from './Buttons'

export default memo(function Profile() {
    const {
        models: {
            user,
            avatar_url,
            isProfileOpen,
            username
        }, 
        commands: {
            uploadUserAvatar
        }
    } = useProfile()
        
    return(
        <>
            {
                isProfileOpen
                && (
                    <div className='flex flex-col items-center py-10 justify-center w-full '>
                        <div className='flex flex-col items-center'>
                            <AvatarUpload
                                url={avatar_url}
                                size={208}
                                onUpload={uploadUserAvatar}
                            />
                            <div className='text-center mt-2'>
                                <h2 className='font-semibold text-4xl text-primary'>
                                    {username}
                                </h2>
                                <h4 className='text-secondary'>
                                    {user?.email}
                                </h4>
                            </div>
                            <Switcher/>
                            <ThemePicker/>
                        </div>
                       <Buttons/>
                    </div>
                ) 
            }
        </>
    )
})