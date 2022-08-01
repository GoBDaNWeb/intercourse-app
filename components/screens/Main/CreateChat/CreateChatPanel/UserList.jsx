// * react/next
import { useState, useEffect, memo } from 'react';

// * redux
import {useSelector} from 'react-redux'

// * supabase
import { supabase } from 'supabase/supabaseClient';
import { fetchAllUsers} from 'supabase/modules/user';

// * components
import UserSelectCard from './UserSelectCard';
import { ThreeDots } from 'react-loader-spinner';

const useStore = (props) => {
    const [users] = useState(new Map())
    const [newOrUpdatedUser, handleNewOrUpdatedUser] = useState(null)

    useEffect(() => {
        const userListener = supabase
            .from('users')
            .on('*', payload => {
                // console.log(payload)
                handleNewOrUpdatedUser(payload.new)
            })
            .subscribe()

        return () => {
            userListener.unsubscribe()
        }
    }, [])

    useEffect(() => {
        if (newOrUpdatedUser) users.set(newOrUpdatedUser.id, newOrUpdatedUser)
      }, [newOrUpdatedUser])

    return {newOrUpdatedUser}
}

export default memo(function UserList({selectedUsers, setSelectedUsers}) {
    const [searchValue, setSearchValue] = useState('')
    const [seacrhedUsers, setSearchedUsers] = useState([])
    const [allUsers, setAllUser] = useState(null)
    const [filteredUsers, setFilteredUsers] = useState([])

    const {user} = useSelector(state => state.auth)

    const {newOrUpdatedUser} = useStore({})

    // ** при монтировании элемента получает данные о всех пользователях
    useEffect(() => {
        const data = fetchAllUsers()
        data.then(users => {
            setAllUser(users)
        })
    }, [newOrUpdatedUser])

    // ** при изменениями allUsers фильтрует полученные данные 
    useEffect(() => {
        if(allUsers !== null) {
            const filtered = allUsers.filter(item => item.id !== user.id)
            setFilteredUsers(filtered)
        }
    }, [allUsers])

    // ** следит за изменениями значения 
    const onChangeSearchValue = (e) => {
        const {value} = e.target
        setSearchValue(value)
    }

    useEffect(() => {
        if (filteredUsers !== null) {
            const searched = filteredUsers.filter(user => (user.username_google ? user.username_google : user.username).toLowerCase().includes(searchValue.toLowerCase()))
            setSearchedUsers(searched)
        }
    }, [searchValue])

    // ** функция выбора пользователей для создания чата
    const selectUser = (user) => {
        const tmpArr = selectedUsers
        if (selectedUsers.includes(user)) {
            const filtered = tmpArr.filter(item => item.id !== user.id)
            setSelectedUsers([...filtered])
        }
        if (!selectedUsers.includes(user)) {
            tmpArr.push(user)
            setSelectedUsers([...tmpArr])
        }
    }

    const userListCondition = filteredUsers !== null && seacrhedUsers.length === 0 && searchValue.length === 0

    const searchUserCondition = seacrhedUsers !== null && seacrhedUsers.length > 0

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
                            selectedUsers={selectedUsers} 
                            selectUser={selectUser}
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
                        selectedUsers={selectedUsers} 
                        selectUser={selectUser}
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