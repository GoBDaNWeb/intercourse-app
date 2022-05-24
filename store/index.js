import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import profileReducer from './profileSlice'
import chatReducer from './chatSlice'
import themeReducer from './themeSlice'
import sidebarReducer from './sidebarSlice'

export default configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        chat: chatReducer,
        theme: themeReducer,
        sidebar: sidebarReducer,
    }
})