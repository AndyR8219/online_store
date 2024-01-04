import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
	reducerPath: 'api',
	tagTypes: ['Users'],
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
		getProducts: build.query({
			query: ({ search = '', categories, page }) => {
				const queryParams = new URLSearchParams();
				if (search) queryParams.append('search', search);
				if (categories) queryParams.append('categories', categories);
				if (page) queryParams.append('page', page);
				const queryString = queryParams.toString();
				return `api/products${queryString ? `?${queryString}` : ''}`;
			},
		}),
		getProductById: build.query({
			query: (productId = '') => `api/products/${productId && `${productId}`}`,
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
	}),
});

export const {
	useGetProductsQuery,
	useLoginUserMutation,
	useCheckTokenQuery,
	useLogoutMutation,
	useAddUserMutation,
	useGetProductByIdQuery,
	useGetUsersQuery,
	useGetUserRoleQuery,
	useDeleteUserMutation,
	useUpdateUserRoleMutation,
} = apiSlice;
