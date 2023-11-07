export const transformProduct = (dbProduct) => ({
	id: dbProduct.id,
	title: dbProduct.title,
	price: dbProduct.price,
	quantity: dbProduct.quantity,
	description: dbProduct.description,
	category: dbProduct.category,
	imageUrl: dbProduct.image_url,
	rating: dbProduct.rating,
});
