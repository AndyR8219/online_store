import { transformProduct } from '../transformers';
import { URL } from '../constants';

export const getProducts = (searchPhrase, page, limit) =>
	fetch(URL.PRODUCTS + `?title_like=${searchPhrase}&_page=${page}&_limit=${limit}`)
		.then((loadedProducts) =>
			Promise.all([loadedProducts.json(), loadedProducts.headers.get('Link')]),
		)
		.then(([loadedProducts, links]) => ({
			posts: loadedProducts && loadedProducts.map(transformProduct),
			links,
		}));
