import { useState } from 'react';
import { useEffect } from 'react';
import { supabase } from './supabaseClient';

export const useStore = (props) => {
    const [personalChats, setPersonalChats] = useState([])
    const [groupChats, setGroupChats] = useState([])
    const [messages, setMessages] = useState([])
    const [users] = useState(new Map())
    const [newMessage, handleNewMessage] = useState(null)
    const [newPersonalChat, handleNewPersonalChat] = useState(null)
    const [newGroupChat, handleNewGroupChat] = useState(null)
    const [newOrUpdatedUser, handleNewOrUpdatedUser] = useState(null)
    const [deletedChannel, handleDeletedChannel] = useState(null)
    const [deletedMessage, handleDeletedMessage] = useState(null)

    useEffect(() => {
        fetchAllPersonalChats(setPersonalChats)
        fetchAllGroupChats(setGroupChats)

        const userListener = supabase
            .from('users')
            .on('*', payload => {handleNewOrUpdatedUser(payload.new)})
            .subscribe()

        const personalChatListener = supabase
            .from('personal_chats')
            .on('INSERT', payload => {
                console.log(payload);
                handleNewPersonalChat(payload.new)
            })
            .on('DELETE', payload => {handleNewPersonalChat(payload.old)})
            .subscribe()

        const groupChatListener = supabase
            .from('group_chats')
            .on('INSERT', payload => {
                console.log(payload);
                handleNewGroupChat(payload.new)
            })
            .on('DELETE', payload => {handleNewGroupChat(payload.old)})
            .subscribe()

        const messageListener = supabase
            .from('messages')
            .on('INSERT', payload => {
                console.log(payload.new);
                handleNewMessage(payload.new)
            })
            .on('DELETE', payload => {handleNewMessage(payload.old)})
            .subscribe()

        // return () => {
        //     userListener.unsubscribe()
        //     personalChatListener.unsubscribe()
        //     groupChatListener.unsubscribe()
        //     messageListener.unsubscribe()
        // }
    }, [])

    // **  следит за изменениями маршрута 
    useEffect(() => {
        if  (props.chatId) {
            fetchMessages(props.chatId, (messages) => {
                messages.forEach((x) => {
                    users.set(x.user_id, x.author)
                })
                setMessages(messages)
            })
        }
    }, [props.chatId])

    useEffect(() => {
        if(newMessage && newMessage.chat_id === props.chatId) {
            setMessages(messages.concat(newMessage))
        }
    }, [newMessage])

    useEffect(() => {
        if (newOrUpdatedUser) users.set(newOrUpdatedUser.id, newOrUpdatedUser)
      }, [newOrUpdatedUser])

    useEffect(() => {
        if (newPersonalChat) setPersonalChats(personalChats.concat(newPersonalChat))
    }, [newPersonalChat])
    
    useEffect(() => {
        if (newGroupChat) setGroupChats(groupChats.concat(newGroupChat))
    }, [newGroupChat])

    return {personalChats, groupChats, users, messages}
}

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

// ** добавить новое сообщение в supabase
export const addMessage = async (message, chat_id, user_id) => {
    try {
      let { body } = await supabase.from('messages').insert([{ message, chat_id, user_id }])
      return body
    } catch (error) {
      console.log('error', error)
    }
}

// ** добавить новый персональный чат в supabase
export const addPersonalChat = async (user, interlocutor, chat_title) => {
    const randomId = len => Math.random().toString(36).substr(3, len);
    const id = randomId(15);
    try {
        let { data } = await supabase
        .from('personal_chats')
        .insert([
            {id, created_by: user, interlocutor, chat_title },
        ])
        return data
    } catch(error) {
        console.log(error);
    }
}

// ** добавить новый групповой чат в supabase
export const addGroupChat = async (user, members, chat_title) => {
    const randomId = len => Math.random().toString(36).substr(3, len);
    const id = randomId(15);
    try {
        let { data } = await supabase
        .from('group_chats')
        .insert([
            {id, created_by: user, members, chat_title },
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

// ** взять все сообщения из supabase
export const fetchMessages = async (chatId, setState) => {
    try {
      let { body } = await supabase
        .from('messages')
        .select(`*, author:user_id(*)`)
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