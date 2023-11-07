import { URL } from '../constants';

export const updatePost = ({
	id,
	title,
	price,
	quantity,
	description,
	category,
	imageUrl,
}) =>
	fetch(URL.PRODUCTS + `/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-type': 'application/json; charset=utf-8',
		},
		body: JSON.stringify({
			title,
			price,
			quantity,
			description,
			category,
			imageUrl,
		}),
	}).then((loadedProduct) => loadedProduct.json());
