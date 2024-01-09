import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
	reducerPath: 'api',
	tagTypes: ['Users', 'Products', 'Cart_items'],
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
			query: ({ search, categories, page, limit = 9 }) => {
				const queryString = new URLSearchParams({
					search: search || '',
					categories:
						categories.length > 0
							? encodeURIComponent(JSON.stringify(categories))
							: '',
					page: page || '',
					limit: limit || '',
				}).toString();
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
		getCartItems: build.query({
			query: (cartId) => `api/carts/${cartId}`,
			providesTags: (result) => {
				if (Array.isArray(result)) {
					return [
						...result.map(({ id }) => ({ type: 'Cart_items', id })),
						{ type: 'Cart_items', id: 'LIST' },
					];
				} else {
					return [{ type: 'Cart_items', id: 'LIST' }];
				}
			},
		}),
		addProductToCart: build.mutation({
			query: ({ cartId, dataProduct }) => ({
				url: `api/carts/${cartId}`,
				method: 'POST',
				body: dataProduct,
			}),
			invalidatesTags: [{ type: 'Cart_items', id: 'LIST' }],
		}),
		deleteProductFromCart: build.mutation({
			query: ({ cartId, productId }) => ({
				url: `api/carts/${cartId}/products/${productId}`,
				method: 'DELETE',
			}),
			invalidatesTags: [{ type: 'Cart_items', id: 'LIST' }],
		}),
		updateQuantityProductInCart: build.mutation({
			query: ({ cartId, itemId, quantity }) => ({
				url: `api/carts/${cartId}/cart_items/${itemId}`,
				method: 'PATCH',
				body: { quantity },
			}),
			invalidatesTags: [{ type: 'Cart_items', id: 'LIST' }],
		}),
		addComment: build.mutation({
			query: ({ productId, content }) => ({
				url: `api/products/${productId}/comments`,
				method: 'POST',
				body: { content },
			}),
			invalidatesTags: [{ type: 'Products', id: 'LIST' }],
		}),
		deleteComment: build.mutation({
			query: ({ productId, commentId }) => ({
				url: `/api/products/${productId}/comments/${commentId}`,
				method: 'DELETE',
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
	useGetCartItemsQuery,
	useAddProductToCartMutation,
	useDeleteProductFromCartMutation,
	useUpdateQuantityProductInCartMutation,
	useAddCommentMutation,
	useDeleteCommentMutation,
} = apiSlice;
