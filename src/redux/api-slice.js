import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: '/',
	}),
	endpoints: (build) => ({
		checkToken: build.query({
			query: () => 'auth/me',
		}),
		loginUser: build.mutation({
			query: (credentials) => ({
				url: 'login',
				method: 'POST',
				body: credentials,
			}),
		}),
		logout: build.mutation({
			query: () => ({
				url: 'logout',
				method: 'POST',
			}),
		}),
		getUsers: build.query({
			query: (loginId = '') => `users/${loginId && `${loginId}`}`,
		}),
		addUser: build.mutation({
			query: (credentials) => ({
				url: 'register',
				method: 'POST',
				body: credentials,
			}),
		}),
		getProducts: build.query({
			query: ({ search = '', categories, page }) => {
				const queryParams = new URLSearchParams();
				if (search) queryParams.append('search', search);
				if (categories) queryParams.append('categories', categories);
				if (page) queryParams.append('page', page);
				const queryString = queryParams.toString();
				return `products${queryString ? `?${queryString}` : ''}`;
			},
		}),
		getProductById: build.query({
			query: (productId = '') => `products/${productId && `${productId}`}`,
		}),
	}),
});

export const {
	useGetProductsQuery,
	useLoginUserMutation,
	useCheckTokenQuery,
	useLogoutMutation,
	useAddUserMutation,
	useGetProductByIdQuery,
} = apiSlice;
