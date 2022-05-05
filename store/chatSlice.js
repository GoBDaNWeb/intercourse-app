import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    bgChat: 'standart'
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setBgChat(state, action) {
            state.bgChat = action.payload
        }
    }
})

export const {setBgChat} = chatSlice.actions

export default chatSlice.reducer