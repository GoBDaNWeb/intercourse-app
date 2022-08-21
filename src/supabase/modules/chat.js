import supabase from '../supabaseClient';

export const updatePrivateChatImage = async (chat_id, image) => {
    try {
        const { data } = await supabase
            .from('privat_chats')
            .update({ image })
            .eq('id', chat_id);
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const updateGroupChatImage = async (chat_id, image) => {
    try {
        const { data } = await supabase
            .from('group_chats')
            .update({ image })
            .eq('id', chat_id);
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const addPrivatChat = async (id, user, interlocutor, chat_title) => {
    try {
        const { data } = await supabase.from('privat_chats').insert([
            {
                id,
                created_by: user,
                interlocutor,
                chat_title,
                created_by_id: user.id,
            },
        ]);
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const addGroupChat = async (id, user, members, chat_title) => {
    try {
        const { data } = await supabase.from('group_chats').insert([
            {
                id,
                created_by: user,
                members,
                chat_title,
                created_by_id: user.id,
            },
        ]);
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const fetchAllPrivatChats = async (setState) => {
    try {
        const { data: privat_chats } = await supabase
            .from('privat_chats')
            .select('*');
        if (setState) setState(privat_chats);
        return privat_chats;
    } catch (error) {
        console.error(error);
    }
};

export const fetchAllGroupChats = async (setState) => {
    try {
        const { data: group_chats } = await supabase
            .from('group_chats')
            .select('*');
        if (setState) setState(group_chats);
        return group_chats;
    } catch (error) {
        console.error(error);
    }
};

export const fetchOnePrivatChat = async (chat_id) => {
    try {
        const { data: privat_chats } = await supabase
            .from('privat_chats')
            .select('*')
            .eq('id', chat_id);
        const chat = privat_chats[0];
        return chat;
    } catch (error) {
        console.error(error);
    }
};

export const fetchOneGroupChat = async (chat_id) => {
    try {
        const { data: group_chats } = await supabase
            .from('group_chats')
            .select('*')
            .eq('id', chat_id);
        const chat = group_chats[0];
        return chat;
    } catch (error) {
        console.error(error);
    }
};
