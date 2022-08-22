// * react/next
import { useState, useEffect } from 'react';

// * supabase
import supabase from 'supabase/supabaseClient';
import { fetchAllGroupChats } from 'supabase/modules/chat';

export default function useGroupChats() {
    const [groupChats, setGroupChats] = useState([]);
    const [newGroupChat, handleNewGroupChat] = useState(null);

    useEffect(() => {
        fetchAllGroupChats(setGroupChats);

        const groupChatListener = supabase
            .from('group_chats')
            .on('INSERT', (payload) => {
                handleNewGroupChat(payload.new);
            })
            .on('DELETE', (payload) => {
                handleNewGroupChat(payload.old);
            })
            .subscribe();

        return () => {
            groupChatListener.unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (newGroupChat) setGroupChats(groupChats.concat(newGroupChat));
    }, [newGroupChat, groupChats]);

    return { groupChats };
}
