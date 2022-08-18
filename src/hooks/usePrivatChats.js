// * react/next 
import {useState, useEffect} from 'react'

// * supabase 
import { supabase } from 'supabase/supabaseClient';
import {fetchAllPrivatChats} from 'supabase/modules/chat'

export function usePrivatChats() {
    const [privatChats, setPrivatChats] = useState([])
    const [newPrivatChat, handleNewPrivatChat] = useState(null)

    useEffect(() => {
        fetchAllPrivatChats(setPrivatChats)

        const privatChatListener = supabase
            .from('privat_chats')
            .on('INSERT', payload => {
                handleNewPrivatChat(payload.new)
            })
            .on('DELETE', payload => {handleNewPrivatChat(payload.old)})
            .subscribe()


        return () => {
            privatChatListener.unsubscribe()
        }
    }, [])

    useEffect(() => {
        if (newPrivatChat) setPrivatChats(privatChats.concat(newPrivatChat))
    }, [newPrivatChat])

    return {privatChats}
}