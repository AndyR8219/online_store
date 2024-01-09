import { CartListItem } from './components';
import { useGetCartItemsQuery } from '../../redux/api-slice';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from '../../components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';

export const CartPage = () => {
	const { id: cartId } = useParams();
	const [cartItems, setCartItems] = useState([]);
	const { data, isLoading } = useGetCartItemsQuery(cartId);

	useEffect(() => {
		if (!isLoading) {
			setCartItems(data.data.cartItems);
		}
	}, [isLoading, data?.data?.cartItems]);

	const calculateTotal = () => {
		return cartItems
			.reduce((total, item) => {
				let itemQuantity = item.quantity;
				if (item.product.quantity === 0) {
					itemQuantity = 0;
				}

				return total + itemQuantity * item.product.price;
			}, 0)
			.toFixed(2);
	};

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
			<Paper sx={{ padding: 4, width: 1200 }}>
				<Typography variant="h4" sx={{ textAlign: 'center', mb: 8 }}>
					Корзина
				</Typography>
				{isLoading ? (
					<Loading />
				) : (
					<>
						<List>
							{cartItems.map((item, i) => (
								<Box key={i}>
									<CartListItem item={item} cartId={cartId} />
								</Box>
							))}
						</List>
						{cartItems.length === 0 && (
							<Typography
								variant="body1"
								sx={{ textAlign: 'center', marginTop: 2 }}
							>
								Корзина пуста. Выберите товары для покупки.
							</Typography>
						)}
						{cartItems.length > 0 && (
							<Typography
								variant="h6"
								sx={{ textAlign: 'right', marginTop: 2 }}
							>
								Итог: ${calculateTotal()}
							</Typography>
						)}
						<Button variant="contained" sx={{ mb: 2 }}>
							Оформить заказ
						</Button>
					</>
				)}
			</Paper>
		</Box>
	);
};
