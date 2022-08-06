import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isOpen: false,
    isPrivatChats: true,
    searchValue: '',
}

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        handleOpenSidebar(state) {
            state.isOpen = !state.isOpen
        }, 
        closeSidebar(state) {
            state.isOpen = false
        },
        handleTypeChats(state) {
            state.isPrivatChats = !state.isPrivatChats
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload
        },
    }
})

export const {handleOpenSidebar, handleTypeChats, closeSidebar, setSearchValue} = sidebarSlice.actions

export default sidebarSlice.reducer