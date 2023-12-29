import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api-slice';
import authReducer from '../features/auth-slice';
import categoriesReducer from '../features/categories-slise';
import { setupListeners } from '@reduxjs/toolkit/query/react';

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		auth: authReducer,
		categories: categoriesReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
