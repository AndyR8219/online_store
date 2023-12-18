import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from './products-api';
import authReducer from '../features/auth-slice';
import { setupListeners } from '@reduxjs/toolkit/query/react';

export const store = configureStore({
	reducer: {
		// auth: authReducer,
		[productsApi.reducerPath]: productsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(productsApi.middleware),
});

setupListeners(store.dispatch);
