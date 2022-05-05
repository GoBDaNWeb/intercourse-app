import { useState } from 'react';
import { useEffect } from 'react';
import { supabase } from './supabaseClient';

// export const useStore = (props) => {
//     const [personalChats, setPersonalChats] = useState([])
//     const [groupChats, setGroupChats] = useState([])
//     const [messages, setMessages] = useState([])
//     const [users] = useState(new Map())
//     const [newMessage, handleNewMessage] = useState(null)
//     const [newPersonalChat, handleNewPersonalChat] = useState(null)
//     const [newGroupChat, handleNewGroupChat] = useState(null)
//     const [newOrUpdatedUser, handleNewOrUpdatedUser] = useState(null)
//     const [UpdatedUser, handleUpdatedUser] = useState(null)
//     const [UpdateUser, setUpdatedUser] = useState(null)
//     const [deletedChannel, handleDeletedChannel] = useState(null)
//     const [deletedMessage, handleDeletedMessage] = useState(null)

//     useEffect(() => {
//         fetchAllPersonalChats(setPersonalChats)
//         fetchAllGroupChats(setGroupChats)

//         const userListener = supabase
//             .from('users')
//             .on('*', payload => {
//                 // console.log(payload)
//                 handleNewOrUpdatedUser(payload.new)
//             })
//             .subscribe()

//         const personalChatListener = supabase
//             .from('personal_chats')
//             .on('INSERT', payload => {
//                 console.log('personal',payload);
//                 handleNewPersonalChat(payload.new)
//             })
//             .on('DELETE', payload => {handleNewPersonalChat(payload.old)})
//             .subscribe()

//         const groupChatListener = supabase
//             .from('group_chats')
//             .on('INSERT', payload => {
//                 console.log(payload);
//                 handleNewGroupChat(payload.new)
//             })
//             .on('DELETE', payload => {handleNewGroupChat(payload.old)})
//             .subscribe()

//         let messageListener = supabase
//             .from('messages')
//             .on('INSERT', payload => {
//                 console.log(payload.new);
//                 handleNewMessage(payload.new)
//             })
//             .on('UPDATE', payload => {console.log(payload)})
//             .on('DELETE', payload => {handleNewMessage(payload.old)})
//             .subscribe()

//         return () => {
//             userListener.unsubscribe()
//             personalChatListener.unsubscribe()
//             groupChatListener.unsubscribe()
//             messageListener.unsubscribe()
//         }
//     }, [])

//     // **  следит за изменениями маршрута 
//     useEffect(() => {
//         if  (props.chatId) {
//             fetchMessages(props.chatId, (messages) => {
//                 messages.forEach((x) => {
//                     users.set(x.user_id, x.author)
//                 })
//                 setMessages(messages)
//             })
//         }
//     }, [props.chatId])

//     useEffect(() => {
//         if(newMessage && newMessage.chat_id === props.chatId) {
//             setMessages(messages.concat(newMessage))
//         }
//     }, [newMessage])

//     useEffect(() => {
//         if (newOrUpdatedUser) users.set(newOrUpdatedUser.id, newOrUpdatedUser)
//         console.log('update', newOrUpdatedUser)
//       }, [newOrUpdatedUser])

//     useEffect(() => {
//         if (newPersonalChat) setPersonalChats(personalChats.concat(newPersonalChat))
//     }, [newPersonalChat])
    
//     useEffect(() => {
//         if (newGroupChat) setGroupChats(groupChats.concat(newGroupChat))
//     }, [newGroupChat])

//     return {personalChats, UpdatedUser, newPersonalChat, newOrUpdatedUser, groupChats, users, messages}
// }

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
        console.log(users); 
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

// ** добавить новый персональный чат в supabase
export const addPersonalChat = async (id, user, interlocutor, chat_title) => {
    try {
        let { data } = await supabase
        .from('personal_chats')
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
export const fetchAllPersonalChats = async (setState) => {
    try {
        let { data: personal_chats } = await supabase
        .from('personal_chats')
        .select('*')
        if (setState) setState(personal_chats)
        return personal_chats
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
export const fetchOnePersonalChat = async (chat_id) => {
    try {
        let { data: personal_chats } = await supabase
        .from('personal_chats')
        .select('*')
        .eq('id', chat_id)
        let chat = personal_chats[0]
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