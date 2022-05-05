import { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {fetchUserAvatar, fetchCurrentUser} from 'utils/Store'


export default function TheirAvatar({ user_id, size, text_size, children }) {
    const [avatar, setAvatar] = useState(null) 
    const [currentUser, setCurrentUser] = useState(null) 

    useEffect(() => {
        if (user_id) {
            const fetchData = fetchUserAvatar(user_id)
            fetchData.then(data => {
                if (data !== null) {
                    setAvatar(data[0])
                }
            })

            const fetchData2 = fetchCurrentUser(user_id)
            fetchData2.then(data => {
            if (data !== null) {
                setCurrentUser(data[0])
            }
            
        })
        }
    }, [user_id])

    return (
	<div 
        className='relative flex justify-center text-8xl font-bold text-accent items-center grad-1 rounded-full group'
        style={{ height: size, width: size }}
        >
            {avatar && avatar.avatar !== null ?
            <img
                src={`https://bxnclqtavxncwdogrurd.supabase.co/storage/v1/object/public/avatars/${avatar.avatar}`}
                className="rounded-full"
                style={{ height: size, width: size }}
            />
            : <div className={`text-white text-${text_size}`}>
                { currentUser !== null &&
                            currentUser.username
                            ? currentUser !== null && currentUser.username[0].toUpperCase()
                            : currentUser !== null && currentUser.username_google[0].toUpperCase()
                        }
            </div>
            }
            {children}
        </div>
        )
}