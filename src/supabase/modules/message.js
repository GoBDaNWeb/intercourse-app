import supabase from '../supabaseClient';

export const addMessage = async ({
    message,
    chat_id,
    user_id,
    author,
    author_avatar,
}) => {
    try {
        const { body } = await supabase
            .from('messages')
            .insert([{ message, chat_id, user_id, author, author_avatar }]);
        return body;
    } catch (error) {
        console.error('error', error);
    }
};

export const updateMessage = async (user_id, message_id, bool) => {
    try {
        const { data } = await supabase
            .from('messages')
            .update({ with_avatar: bool })
            .eq('user_id', user_id)
            .eq('id', message_id);
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const fetchMessages = async (chatId, setState) => {
    try {
        const { body } = await supabase
            .from('messages')
            .select('*')
            .eq('chat_id', chatId)
            .order('inserted_at', true);
        if (setState) setState(body);
        return body;
    } catch (error) {
        console.error('error', error);
    }
};
