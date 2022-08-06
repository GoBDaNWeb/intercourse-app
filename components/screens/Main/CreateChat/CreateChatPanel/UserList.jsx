// * react/next
import {memo} from 'react'

// * hooks
import { useCreateChatPanel } from './useCreateChatPanel';

// * components
import UserSelectCard from './UserSelectCard';
import { ThreeDots } from 'react-loader-spinner';

export default memo(function UserList({selectUser, selectedUsers}) {
    const {
        models: {
            seacrhedUsers,
            allUsers,
            filteredUsers,
            userListCondition,
            searchUserCondition
        },
        commands: {
            onChangeSearchValue,
        }
    } = useCreateChatPanel()

    return (
        <div className='w-full'>
            <input 
                onChange={onChangeSearchValue}
                className='transition-all duration-[0.4s]  w-full text-primary bg-primary outline-none px-4 py-2 rounded-t-[20px] border-2 border-b-0 border-solid border-gray-200 dark:border-gray-800 bg-opacity-80'
                placeholder='search user by name'
                type="text" 
            />
            <div className='transition-all duration-[0.4s]  border-2 border-solid border-gray-200 dark:border-gray-800 flex flex-col items-center bg-opacity-80 w-full h-[244px] rounded-b-[20px] overflow-auto custom-scroll'>
            {
                    userListCondition
                    && filteredUsers.map((user, index) => (
                        <UserSelectCard 
                            key={user.id} 
                            user={user} 
                            index={index} 
                            selectUser={selectUser}
                            selectedUsers={selectedUsers}
                        />
                    ))
            }
            {
                searchUserCondition
                && seacrhedUsers.map((user, index) => (
                    <UserSelectCard 
                        key={user.id}
                        user={user} 
                        index={index}
                        selectUser={selectUser}
                        selectedUsers={selectedUsers}
                    />
                ))
            }
            {
                !allUsers
                && <ThreeDots color="#22C55E"/>
            }
            </div>
        </div>
    )
})