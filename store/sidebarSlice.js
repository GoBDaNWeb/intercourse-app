import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isOpen: false
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
        }
    }
})

export const {handleOpenSidebar, closeSidebar} = sidebarSlice.actions

export default sidebarSlice.reducer