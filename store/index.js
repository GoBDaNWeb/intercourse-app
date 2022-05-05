import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import profileReducer from './profileSlice'
import chatReducer from './chatSlice'
import themeReducer from './themeSlice'

export default configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        chat: chatReducer,
        theme: themeReducer,
    }
})