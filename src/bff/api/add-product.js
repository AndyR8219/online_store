import { URL } from '../constants';

export const addProduct = ({ title, price, quantity, desription, category, imageUrl }) =>
	fetch(URL.PRODUCTS, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json; charset=utf-8',
		},
		body: JSON.stringify({
			title,
			price,
			quantity,
			desription,
			category,
			image_url: imageUrl,
		}),
	}).then((createdProduct) => createdProduct.json());
