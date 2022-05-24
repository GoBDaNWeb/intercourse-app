import { supabase } from './supabaseClient';

// ** добавить нового пользователя в supabase
export const addUser = async (user_id, email) => {
    try {
        let { data } = await supabase
        .from('users')
        .insert([
            { id: user_id, email},
        ])
        return data
    } catch(error) {
        console.log(error);
    }
}
export const resetPassword = async (email) => {
    try {
        const { data } = await supabase.auth.api
        .resetPasswordForEmail(email)
        return data
    } catch(error) {
        console.log(error);
    }
}

export const updateUserStatus = async (user_id, new_status) => {
    try {
        let { data } = await supabase
        .from('users')
        .update({ status: new_status })
        .eq('id', user_id)
        console.log(data); 
        return data
    } catch(error) {
        console.log(error);
    }
}

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
        console.log(data); 
        return data
    } catch(error) {
        console.log(error);
    }
}

export const updateUserAvatar = async (user_id, avatar) => {
    try {
        let { data } = await supabase
        .from('users')
        .update({ avatar: avatar })
        .eq('id', user_id)
        console.log(data); 
        return data
    } catch(error) {
        console.log(error);
    }
}

export const fetchUserAvatar = async (user_id) => {
    try {
        let { data: users } = await supabase
        .from('users')
        .select('avatar')
        .eq('id', user_id)
        return users
    } catch(error) {
        console.log(error);
    }
}


export const updateUserTyping = async (user_id, old_status, new_status) => {
    try {
        let { data } = await supabase
        .from('users')
        .update({ is_typing: new_status })
        .match({ is_typing: old_status })
        .eq('id', user_id)
        // console.log(data);
        return data
    } catch(error) {
        console.log(error);
    }
}

export const updateUserTypingChat = async (user_id, new_status) => {
    try {
        let { data } = await supabase
        .from('users')
        .update({ typing_chat: new_status })
        .eq('id', user_id)
        console.log(data);
        return data
    } catch(error) { 
        console.log(error);
    }
}

export const updateUserTypingAnyway = async (user_id) => {
    try {
        let { data } = await supabase
        .from('users')
        .update({ is_typing: false })
        .eq('id', user_id)
        console.log(data);
        return data
    } catch(error) {
        console.log(error);
    }
}

// ** добавить новое сообщение в supabase
export const addMessage = async (message, chat_id, user_id, author) => {
    try {
      let { body } = await supabase
      .from('messages')
      .insert([{ message, chat_id, user_id, author }])
      return body
    } catch (error) {
      console.log('error', error)
    }
}

// ** добавить новый приватный чат в supabase
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

export const updateMessage = async (user_id, message_id, bool) => {
    try {
        const { data } = await supabase
            .from('messages')
            .update({ with_avatar: bool })
            .eq('user_id', user_id)
            .eq('id', message_id)
            return data
    } catch(error) {
        console.log(error);
    }
}

// ** добавить новый групповой чат в supabase
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

// ** взять всех пользователей из supabase
export const fetchAllUsers = async () => {
    try {
        let { data: users } = await supabase
        .from('users')
        .select('*')
        return users
    } catch (error) {
        console.log(error);
    }
}

export const fetchCurrentUser = async (id) => {
    try {
        let { data: users } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
        return users
    } catch (error) {
        console.log(error);
    }
}

// ** взять все сообщения из supabase
export const fetchMessages = async (chatId, setState) => {
    try {
      let { body } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('inserted_at', true)
      if (setState) setState(body)
      return body
    } catch (error) {
      console.log('error', error)
    }
}

// ** взять все персональные чаты из supabase
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

// ** взять все групповые чаты из supabase
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

// ** взять один персональный чат из supabase
export const fetchOnePrivatChat = async (chat_id) => {
    try {
        let { data: privat_chats } = await supabase
        .from('privat_chats')
        .select('*')
        .eq('id', chat_id)
        let chat = privat_chats[0]
        console.log(privat_chats);
        return chat
    } catch(error) {
        console.log(error);
    }
}

// ** взять один групповой чат из supabase
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