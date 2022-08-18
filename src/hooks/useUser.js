// * react/next 
import {useState, useEffect} from 'react'

// * supabase 
import { supabase } from 'supabase/supabaseClient';

export function useUser() {
    const [users] = useState(new Map())
    const [newOrUpdatedUser, handleNewOrUpdatedUser] = useState(null)

    useEffect(() => {
        const userListener = supabase
            .from('users')
            .on('*', payload => {
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