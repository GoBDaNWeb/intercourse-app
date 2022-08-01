import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isProfileOpen: false,
    isTheirProfileOpen: false,
    theirProfileData: '',
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        handleOpenProfile(state) {
            state.isProfileOpen = !state.isProfileOpen
            state.isTheirProfileOpen = false
        },
        handleOpenTheirProfile(state) {
            state.isTheirProfileOpen = !state.isTheirProfileOpen
            state.isProfileOpen = false
        },
        setTheirProfileData(state, action) {
            state.theirProfileData = action.payload
        }
    }
})

export const {handleOpenProfile, handleOpenTheirProfile, setAvatar, setTheirProfileData} = profileSlice.actions

export default profileSlice.reducer