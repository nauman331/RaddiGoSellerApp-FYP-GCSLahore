import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    userdata?: object;
}

const initialState: AuthState = {
    token: null,
    userdata: {},
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<string>) {
            state.token = action.payload;
            state.userdata = {};
        },
        logout(state) {
            state.token = null;
            state.userdata = {};
        },
    },
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;