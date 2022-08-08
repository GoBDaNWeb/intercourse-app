// * react/next
import {memo} from 'react'

// * components
import Avatar from 'components/shared/Avatar'

const UserSelectCard = memo(({user, selectUser, selectedUsers}) => {
    const username = user.username || user.username_google

    return (
        <div 
            onClick={() => selectUser(user)}
            className={`transition-all duration-[0.4s] relative flex-col bg-secondary border-b-2 border-solid border-gray-200 dark:border-gray-800 font-semibold w-full text-primary min-h-14 flex flex-wrap justify-center items-center p-2 gap-1 cursor-pointer hover:bg-opacity-70 transition ${selectedUsers.includes(user) ? 'bg-disable text-secondary' : ''}`}
        >
            <Avatar
                avatar={user.avatar}
                username={username}
                size={32}
                text_size={'lg'}
            />
            <div>
                <h5 className='text-center'>
                    {user.username || user.username_google}
                </h5>
                <h6 className='text-sm font-light'>
                    ({user.email})
                </h6>
            </div>
            <div className='absolute top-1 right-2 flex flex-col justify-center items-center text-sm'> 
                <div className={`w-2 h-2 ${user.status === 'OFFLINE' ? 'bg-red-500' : 'bg-green-500'} rounded-full`}></div>
                <h3>
                    {user.status.toLowerCase()}
                </h3>
            </div>

        </div>
    )
})

UserSelectCard.displayName = 'UserSelectCard';

export default UserSelectCard