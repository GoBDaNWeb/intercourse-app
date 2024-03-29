import supabase from '../supabaseClient';

export const addUser = async (user_id, email) => {
    try {
        const { data } = await supabase
            .from('users')
            .insert([{ id: user_id, email }]);
        return data;
    } catch (error) {
        console.error(error);
    }
};
export const resetPassword = async (email) => {
    try {
        const { data } = await supabase.auth.api.resetPasswordForEmail(email);
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const updateUserStatus = async (user_id, new_status) => {
    try {
        const { data } = await supabase
            .from('users')
            .update({ status: new_status })
            .eq('id', user_id);
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const updateUserAvatar = async (user_id, avatar) => {
    try {
        const { data } = await supabase
            .from('users')
            .update({ avatar })
            .eq('id', user_id);
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const fetchUserAvatar = async (user_id) => {
    try {
        const { data: users } = await supabase
            .from('users')
            .select('avatar')
            .eq('id', user_id);
        return users;
    } catch (error) {
        console.error(error);
    }
};

export const updateUserTyping = async (user_id, old_status, new_status) => {
    try {
        const { data } = await supabase
            .from('users')
            .update({ is_typing: new_status })
            .match({ is_typing: old_status })
            .eq('id', user_id);
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const updateUserTypingChat = async (user_id, new_status) => {
    try {
        const { data } = await supabase
            .from('users')
            .update({ typing_chat: new_status })
            .eq('id', user_id);
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const updateUserTypingAnyway = async (user_id) => {
    try {
        const { data } = await supabase
            .from('users')
            .update({ is_typing: false })
            .eq('id', user_id);
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const fetchAllUsers = async () => {
    try {
        const { data: users } = await supabase.from('users').select('*');
        return users;
    } catch (error) {
        console.error(error);
    }
};

export const fetchCurrentUser = async (id) => {
    try {
        const { data: users } = await supabase
            .from('users')
            .select('*')
            .eq('id', id);
        return users;
    } catch (error) {
        console.error(error);
    }
};
