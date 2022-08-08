// * react/next
import {memo} from 'react'
import {useRouter} from 'next/router'

// * redux
import {useDispatch} from 'react-redux'
import {signOut} from 'store/authSlice'
import {handleOpenProfile} from 'store/profileSlice'

// * supabase
import {updateUserStatus} from 'supabase/modules/user'

// * icons
import {AiOutlineClose} from 'react-icons/ai'
import {ImExit} from 'react-icons/im'

const Buttons = memo(() => {
    const dispatch = useDispatch()

    const router = useRouter()

    // ** функция выхода из аккаунта
    const signOutFunc = () => {
        updateUserStatus(user.id, 'OFFLINE')
        dispatch(signOut())
        router.push('/')
    }
    return (
        <>
             <button 
                onClick={() => dispatch(handleOpenProfile())}
                className='absolute right-2 top-6 text-2xl text-primary cursor-pointer'
            >
                <AiOutlineClose/>
            </button>
            <button 
                onClick={() => signOutFunc()}
                className='absolute top-6 left-2 text-3xl pl-2 text-primary'
            >
                <ImExit/>
            </button>
        </>
    )
})

Buttons.displayName = 'Buttons';

export default Buttons