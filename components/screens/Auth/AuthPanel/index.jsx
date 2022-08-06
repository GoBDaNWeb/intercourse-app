// * react/next
import {memo} from 'react'

// * hooks
import {useAuthPanel} from './useAuthPanel'

// * icons
import {FcGoogle} from 'react-icons/fc'

// * components
import AuthComponents from './AuthComponents';


export default memo(function AuthPanel() {
    const {
        commands: {
            handleSignInWithProvider
        }
    } = useAuthPanel()

    return (
        <div className='z-50'>
            <div className='flex flex-col items-center justify-center gap-6 max-w-[280px] sm:max-w-[512px] max-h-[636px] bg-[#273345] rounded-2xl bg-opacity-70 backdrop-blur-sm shadow-md px-16 py-10'>
                <AuthComponents/>
                <div className='flex items-center justify-center gap-4 text-5xl'>
                    <button 
                        onClick={handleSignInWithProvider}
                        className='cursor-pointer'
                    >
                        <FcGoogle/>
                    </button>		
                </div>
            </div>
        </div>
    )
})