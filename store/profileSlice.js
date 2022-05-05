import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isProfileOpen: false,
    isTheirProfileOpen: false,
    theirProfileData: '',
    avatar: null,
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
        setAvatar(state, action) {
            state.avatar = action.payload
        },
        setTheirProfileData(state, action) {
            state.theirProfileData = action.payload
        }
    }
})

export const {handleOpenProfile, handleOpenTheirProfile, setAvatar, setTheirProfileData} = profileSlice.actions

export default profileSlice.reducer