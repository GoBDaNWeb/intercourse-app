import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    bgChat: 'standart',
    searchValue: '',
    isPrivatChats: true,
    notification: [],
    notificationForSound: [],
    messages: [],
    privatChats: []
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setBgChat(state, action) {
            state.bgChat = action.payload
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload
        },
        handleTypeChats(state) {
            state.isPrivatChats = !state.isPrivatChats
        },
        setNotification(state, action) {
            state.notification.push(action.payload)
        },
        setNotificationForSound(state, action) {
            state.notificationForSound.push(action.payload)
        },
        clearNotification(state, action) {
            state.notification = action.payload
        },
        setMessages(state, action) {
            state.messages = action.payload
        },
        setPrivatChats(state, action) {
            state.privatChats = action.payload
        }
    }
})

export const {
    setBgChat, 
    setSearchValue, 
    handleTypeChats, 
    setNotification, 
    clearNotification, 
    setNotificationForSound, 
    setMessages
} = chatSlice.actions

export default chatSlice.reducer