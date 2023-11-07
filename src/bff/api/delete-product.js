import { URL } from '../constants';

export const deleteProduct = (productId) => {
	fetch(URL.PRODUCTS + `/${productId}`, {
		method: 'DELETE',
	});
};
