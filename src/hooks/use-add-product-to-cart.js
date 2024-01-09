import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../slice/auth-slice';
import { useAddProductToCartMutation } from '../redux';

export const useAddProductToCart = () => {
	const user = useSelector(selectCurrentUser);

	const [addProductToCart] = useAddProductToCartMutation();

	if (!user) {
		return;
	}

	const handledProductToCart = async (productId) => {
		try {
			await addProductToCart({
				cartId: user?.cartId,
				dataProduct: {
					productId: productId,
					quantity: 1,
				},
			});
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	return handledProductToCart;
};
