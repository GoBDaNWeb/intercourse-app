import { supabase } from '../supabaseClient';

export const updatePrivateChatImage = async (chat_id, image) => {
    try {
        let { data } = await supabase
        .from('privat_chats')
        .update({ image: image })
        .eq('id', chat_id)
        console.log(data); 
        return data
    } catch(error) {
        console.log(error);
    }
}

export const updateGroupChatImage = async (chat_id, image) => {
    try {
        let { data } = await supabase
        .from('group_chats')
        .update({ image: image })
        .eq('id', chat_id)
        return data
    } catch(error) {
        console.log(error);
    }
}

export const addPrivatChat = async (id, user, interlocutor, chat_title) => {
    try {
        let { data } = await supabase
        .from('privat_chats')
        .insert([
            {id, created_by: user, interlocutor, chat_title, created_by_id: user.id },
        ])
        return data
    } catch(error) {
        console.log(error);
    }
}

export const addGroupChat = async (id, user, members, chat_title) => {
    try {
        let { data } = await supabase
        .from('group_chats')
        .insert([
            {id, created_by: user, members, chat_title, created_by_id: user.id },
        ])
        return data
    } catch(error) {
        console.log(error);
    }
}

export const fetchAllPrivatChats = async (setState) => {
    try {
        let { data: privat_chats } = await supabase
        .from('privat_chats')
        .select('*')
        if (setState) setState(privat_chats)
        return privat_chats
    } catch(error) {
        console.log(error);
    }
}

export const fetchAllGroupChats = async (setState) => {
    try {
        let { data: group_chats } = await supabase
        .from('group_chats')
        .select('*')
        if (setState) setState(group_chats)
        return group_chats
    } catch(error) {
        console.log(error);
    }
}

export const fetchOnePrivatChat = async (chat_id) => {
    try {
        let { data: privat_chats } = await supabase
        .from('privat_chats')
        .select('*')
        .eq('id', chat_id)
        let chat = privat_chats[0]
        console.log('fetch one privat chat',privat_chats);
        return chat
    } catch(error) {
        console.log(error);
    }
}

export const fetchOneGroupChat = async (chat_id) => {
    try {
        let { data: group_chats } = await supabase
        .from('group_chats')
        .select('*')
        .eq('id', chat_id)
        let chat = group_chats[0]
        return chat
    } catch(error) {
        console.log(error);
    }
}