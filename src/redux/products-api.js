import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3003/' }),
	endpoints: (build) => ({
		getProducts: build.query({
			query: (id = '') => `products/${id && `${id}`}`,
		}),
		loginUser: build.mutation({
			query: (body) => {
				//логика проверки

				return {
					url: '/users',
					method: 'POST',
					body,
				};
			},
		}),
	}),
});

export const { useGetProductsQuery, useLoginUserMutation } = productsApi;
