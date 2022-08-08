// * react/next
import {memo, useState, useEffect, useCallback} from 'react'

// * redux
import {useSelector} from 'react-redux'

// * hooks 
import {useUser} from 'hooks/useUser'

// * supabase
import { fetchAllUsers} from 'supabase/modules/user';

// * components
import UserSelectCard from './UserSelectCard';
import { ThreeDots } from 'react-loader-spinner';

const UserList = memo(({handleSelectUser, selectedUsers}) => {
    const [searchValue, setSearchValue] = useState('')
    const [seacrhedUsers, setSearchedUsers] = useState([])
    const [allUsers, setAllUser] = useState(null)
    const [filteredUsers, setFilteredUsers] = useState([])

    const {user} = useSelector(state => state.auth)
    const {newOrUpdatedUser} = useUser()

    const onChangeSearchValue = useCallback(e => {
        const {value} = e.target
        setSearchValue(value)
    }, [])

    const fetchUsers = async () => {
        const response = await fetchAllUsers()
        const filtered = response.filter(item => item.id !== user.id)
        setFilteredUsers(filtered)
        setAllUser(response)
    }

    useEffect(() => {
        fetchUsers()
    }, [newOrUpdatedUser])

    const filterAndSetUsers = () => {
        const searched = filteredUsers.filter(user => {
            const username = user.username_google ? user.username_google : user.username
            
            return username
                .toLowerCase()
                .includes(searchValue.toLowerCase())
        })
        setSearchedUsers(searched)
    }

    useEffect(() => {
        filteredUsers !== null && filterAndSetUsers()
    }, [searchValue])

    const userListCondition = seacrhedUsers?.length === 0 && searchValue.length === 0
    const searchUserCondition = seacrhedUsers?.length > 0

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
                            handleSelectUser={handleSelectUser}
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
                        handleSelectUser={handleSelectUser}
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

UserList.displayName = 'UserList';

export default UserList