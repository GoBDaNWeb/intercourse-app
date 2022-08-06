// * react/next
import {useEffect} from 'react'

// * redux
import { useSelector } from 'react-redux';

// * supabase
import {updateUserStatus} from 'supabase/modules/user'

export function useMain() {
    const {user} = useSelector(state => state.auth)
    
    useEffect(() => {
        document.addEventListener("visibilitychange", () => {
            if (document.hidden){
                if(user !== null) {
                    updateUserStatus(user.id, 'OFFLINE')
                }
                console.log('Вкладка не активна');
        
            } else {
                if(user !== null) {
                    updateUserStatus(user.id, 'ONLINE')
                }
                console.log('Вкладка активна');
            }
        });
    })

}