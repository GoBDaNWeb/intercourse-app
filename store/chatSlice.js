import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    bgChat: 'standart',
    searchValue: '',
    isPersonalChats: true,
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
            state.isPersonalChats = !state.isPersonalChats
        }
    }
})

export const {setBgChat, setSearchValue, handleTypeChats} = chatSlice.actions

export default chatSlice.reducer