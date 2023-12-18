import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	name: null,
	token: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action) => {
			console.log('authSlice');
			localStorage.setItem(
				'user',
				JSON.stringify({
					name: action.payload.name,
					token: action.payload.token,
				}),
			);
			state.name = action.payload.name;
			state.token = action.payload.token;
		},
	},
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;

export const selectAuth = (state) => state.auth;
