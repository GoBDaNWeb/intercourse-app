import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    bgChat: 'standart',
    notification: [],
    notificationForSound: [],
    messages: [],
    privatChatData: null,
    groupChatData: null,
    isOpenMenuPrivatChatHeader: false,
    isOpenMenuGroupChatHeader: false,
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setBgChat(state, action) {
            state.bgChat = action.payload
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
        setPrivatChatData(state, action) {
            state.privatChatData = action.payload
        },
        setGroupChatData(state, action) {
            state.groupChatData = action.payload
        },
        setOpenMenuPrivatChatHeader(state, action) {
            state.isOpenMenuPrivatChatHeader = action.payload
        },
        setOpenMenuGroupChatHeader(state, action) {
            state.isOpenMenuGroupChatHeader = action.payload
        },
    }
})

export const {
    setBgChat, 
    setNotification, 
    setNotificationForSound, 
    clearNotification, 
    setMessages,
    setPrivatChatData,
    setGroupChatData,
    setOpenMenuPrivatChatHeader,
    setOpenMenuGroupChatHeader
} = chatSlice.actions

export default chatSlice.reducer