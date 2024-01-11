import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../slice/auth-slice';
import { useAddProductToCartMutation } from '../redux';
import { useNavigate } from 'react-router-dom';

export const useAddProductToCart = () => {
	const user = useSelector(selectCurrentUser);
	const navigate = useNavigate();
	const [addProductToCart] = useAddProductToCartMutation();

	const handledProductToCart = async (setNotification, productId) => {
		try {
			if (user) {
				await addProductToCart({
					cartId: user?.cartId,
					dataProduct: {
						productId: productId,
						quantity: 1,
					},
				});
				setNotification({
					message: 'Товара добавлен в корзину!',
					type: 'success',
				});
			} else {
				setNotification({
					message: 'Для покупок требуется авторизация!',
					type: 'error',
				});
				setTimeout(() => {
					navigate('/login');
				}, 1500);
			}
		} catch (error) {
			console.error(error);
			setNotification({
				message: 'Возникла ошибка при добавлении товара в корзину!',
				type: 'error',
			});
		}
	};

	return handledProductToCart;
};
