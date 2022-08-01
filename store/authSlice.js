import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {supabase} from '../utils/supabaseClient'
import {useRouter} from 'next/router'

const initialState = {
    user: null,
    avatar: null,
    status: null,
    error: null,
    session: null,
}

export const signInWithProvider = createAsyncThunk(
    'auth/signInWithProvider',
    async (provider, {rejectWithValue}) => {
        try {
            const {error} = await supabase.auth.signIn({
                provider
            })
            if (error) {
                throw new Error(error.message)
            }
        } catch(error) {
            return rejectWithValue(error.message)
        }
    }
)

// ** реализует логику создания нового аккаунта
export const signUp = createAsyncThunk(
    'auth/signUp',
    async (data, {rejectWithValue}) => {
        try {
            if(data.password !== data.confirm) {
                throw new Error('password dont match')
            } 
            await supabase.auth.signUp(
                { 
                    email: data.email, 
                    password: data.password
                },
                {
                    data: {
                        username: data.username
                    }
                }
            )
        } catch(error) {
            return rejectWithValue(error.message)
        }
    }
)

// ** реализует логику входа в аккаунт
export const signIn = createAsyncThunk(
    'auth/signIn',
    async (data, {rejectWithValue}) => {
        try {
            const {error} = await supabase.auth.signIn({email: data.email, password: data.password})
            if (error) {
                throw new Error(error.message)
            }
        } catch(error) {
            return rejectWithValue(error.message)
        }
    }
)


// ** реализует логику выхода из аккаунта
export const signOut = createAsyncThunk(
    'auth/signOut',
    async (_, {rejectWithValue, dispatch}) => {
        try {
            await supabase.auth.signOut()
        } catch(error) {
            return rejectWithValue(error.message)
        }
    }
)

// ** при появлении ошибки записывает ее в state
const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError(state) {
            state.error = null
        },
        setUser(state, action) {
            state.user = action.payload
        },
        setAvatar(state, action) {
            state.avatar = action.payload
        },
        setSession(state, action) {
            state.session = action.payload
        },

    },
    extraReducers: {
        [signOut.rejected]: setError,
        [signIn.rejected]: setError,
        [signUp.rejected]: setError
    }
})

export const {clearError, setUser, setAvatar, setSession} = authSlice.actions

export default authSlice.reducer