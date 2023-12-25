import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'auth',
	initialState: { user: null, token: null, isAuthenticated: false },
	reducers: {
		setCredentials: (state, action) => {
			const { user, token } = action.payload;

			state.user = user;
			state.token = token;
		},
		logOut: (state, action) => {
			state.user = null;
			state.token = null;
		},
		setUser: (state, action) => {
			state.user = action.payload;
			state.isAuthenticated = !!action.payload;
		},
		clearUser: (state) => {
			state.user = null;
			state.isAuthenticated = false;
		},
	},
});

export const { setCredentials, logOut, setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
