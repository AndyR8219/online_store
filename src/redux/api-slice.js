import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
	reducerPath: 'api',
	tagTypes: ['Users', 'Products'],
	baseQuery: fetchBaseQuery({
		baseUrl: '/',
	}),
	endpoints: (build) => ({
		checkToken: build.query({
			query: () => 'auth/me',
		}),
		loginUser: build.mutation({
			query: (credentials) => ({
				url: 'auth/login',
				method: 'POST',
				body: credentials,
			}),
		}),
		logout: build.mutation({
			query: () => ({
				url: 'auth/logout',
				method: 'POST',
			}),
		}),
		getUsers: build.query({
			query: (loginId = '') => `api/users/${loginId && `${loginId}`}`,
			providesTags: (result) => {
				if (Array.isArray(result)) {
					return [
						...result.map(({ id }) => ({ type: 'Users', id })),
						{ type: 'Users', id: 'LIST' },
					];
				} else {
					return [{ type: 'Users', id: 'LIST' }];
				}
			},
		}),
		addUser: build.mutation({
			query: (credentials) => ({
				url: 'auth/register',
				method: 'POST',
				body: credentials,
			}),
		}),
		getUserRole: build.query({
			query: () => 'api/users/roles',
		}),
		deleteUser: build.mutation({
			query: (userId) => ({
				url: `api/users/${userId}`,
				method: 'DELETE',
			}),
			invalidatesTags: [{ type: 'Users', id: 'LIST' }],
		}),
		updateUserRole: build.mutation({
			query: ({ userId, roleId }) => ({
				url: `api/users/${userId}`,
				method: 'PATCH',
				body: { roleId },
			}),
			invalidatesTags: [{ type: 'Users', id: 'LIST' }],
		}),
		getProducts: build.query({
			query: ({ search = '', categories, page, limit }) => {
				const queryParams = new URLSearchParams();
				if (search) queryParams.append('search', search);
				if (categories) queryParams.append('categories', categories);
				if (page) queryParams.append('page', page);
				if (limit) queryParams.append('limit', limit);
				const queryString = queryParams.toString();
				return `api/products${queryString ? `?${queryString}` : ''}`;
			},
			providesTags: (result) => {
				if (Array.isArray(result)) {
					return [
						...result.map(({ id }) => ({ type: 'Products', id })),
						{ type: 'Products', id: 'LIST' },
					];
				} else {
					return [{ type: 'Products', id: 'LIST' }];
				}
			},
		}),
		getProductById: build.query({
			query: (productId = '') => `api/products/${productId && `${productId}`}`,
		}),
		deleteProductById: build.mutation({
			query: (productId) => ({
				url: `api/products/${productId}`,
				method: 'DELETE',
			}),
			invalidatesTags: [{ type: 'Products', id: 'LIST' }],
		}),
		updateProduct: build.mutation({
			query: ({ productId, product }) => ({
				url: `api/products/${productId}`,
				method: 'PATCH',
				body: product,
			}),
			invalidatesTags: [{ type: 'Products', id: 'LIST' }],
		}),
		addProduct: build.mutation({
			query: (product) => ({
				url: 'api/products/',
				method: 'POST',
				body: product,
			}),
			invalidatesTags: [{ type: 'Products', id: 'LIST' }],
		}),
	}),
});

export const {
	useLoginUserMutation,
	useCheckTokenQuery,
	useLogoutMutation,
	useAddUserMutation,
	useGetUsersQuery,
	useGetUserRoleQuery,
	useUpdateUserRoleMutation,
	useDeleteUserMutation,
	useGetProductsQuery,
	useGetProductByIdQuery,
	useDeleteProductByIdMutation,
	useUpdateProductMutation,
	useAddProductMutation,
} = apiSlice;
