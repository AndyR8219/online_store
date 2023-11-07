import { getProducts } from '../api';

export const fetchProducts = async (searchPhrase, page, limit) => {
	const [{ products, links }] = await Promise(getProducts(searchPhrase, page, limit));

	return {
		error: null,
		res: {
			products: products.map((product) => ({
				...product,
			})),
			links,
		},
	};
};
