// * react/next
import {memo, useState} from 'react'

// * redux
import {useSelector} from 'react-redux'

// * components
import AvatarUpload from './AvatarUpload'
import Switcher from 'components/shared/Switcher'
import ThemePicker from './ThemePicker'
import Buttons from './Buttons'

const Profile = memo(() => {
    const {isProfileOpen} = useSelector(state => state.profile)
    const {user} = useSelector(state => state.auth)

    const username = user?.user_metadata.name ? user?.user_metadata.name : user?.user_metadata.username
        
    return(
        <>
            {
                isProfileOpen
                && (
                    <div className='flex flex-col items-center py-10 justify-center w-full '>
                        <div className='flex flex-col items-center'>
                            <AvatarUpload size={208}/>
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

Profile.displayName = 'Profile';

export default Profile