import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3005/' }),
	endpoints: (build) => ({
		getProducts: build.query({
			query: (id = '') => `products?${id && `id=${id}`}`,
		}),
	}),
});

export const { useGetProductsQuery } = productsApi;
