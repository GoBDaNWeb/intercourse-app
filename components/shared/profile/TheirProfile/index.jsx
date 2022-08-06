// * hooks
import {useTheirProfile} from './useTheirProfile'

// * supabase
import {AiOutlineClose} from 'react-icons/ai'

// * components
import TheirAvatar from 'components/shared/profile/TheirAvatar'

export default function TheirProfile() {
    const {
        models: {
            avatarUrl,
            currentUser,
            chatTitle,
            username
        },
        commands: {
            newChat,
            onChange,
            handleOpenTheirProfileFunc
        }
    } = useTheirProfile()

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
                            onChange={onChange}
                            className='text-primary bg-primary outline-none px-4 py-2 rounded-[20px] border-2 border-solid border-gray-200 dark:border-gray-800 bg-opacity-80'
                            placeholder='enter title'
                            type="text"
                        />
                        <button
                            disabled={!chatTitle.length}
                            onClick={newChat}
                            className='text-accent text-xl bg-accent px-4 rounded-full bg-opacity-80 disabled:opacity-50 disabled:pointer-events-none'
                        >
                            create
                        </button>
                    </div>
                </div>
                <div 
                    onClick={handleOpenTheirProfileFunc}
                    className='absolute right-2 top-6 text-2xl text-primary cursor-pointer'
                >
                    <AiOutlineClose/>
                </div>
            </div>
        </div>
    )
}