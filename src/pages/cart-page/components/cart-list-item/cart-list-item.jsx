import { useState } from 'react';
import CardMedia from '@mui/material/CardMedia';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Divider from '@mui/material/Divider';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import {
	useDeleteProductFromCartMutation,
	useUpdateQuantityProductInCartMutation,
} from '../../../../redux/api-slice';

export const CartListItem = ({ item, cartId }) => {
	const [quantity, setQuantity] = useState(item.quantity);
	const [deleteProductFromCart] = useDeleteProductFromCartMutation();
	const [updateQuantityProductInCart] = useUpdateQuantityProductInCartMutation();

	if (!item) {
		return;
	}

	const {
		image,
		price,
		title,
		id: productId,
		quantity: productQuantity,
	} = item.product;

	const handleQuantityChange = async (newQuantity) => {
		setQuantity(newQuantity);
		try {
			await updateQuantityProductInCart({
				cartId,
				itemId: item.itemId,
				quantity: parseInt(newQuantity, 10),
			});
		} catch (error) {
			console.error('Не удалось обновить количество:', error);
		}
	};

	const handleRemoveFromCart = async (cartId, productId) => {
		try {
			await deleteProductFromCart({ cartId, productId });
		} catch (error) {
			console.error(error);
		}
	};

	const calculateTotal = () => {
		if (!isAvailable || productQuantity === 0) {
			return productQuantity;
		}
		return (quantity * price).toFixed(2);
	};

	const isAvailable = productQuantity > 0;

	return (
		<Paper sx={{ mb: 2 }}>
			<ListItem>
				<CardMedia
					sx={{ maxWidth: 50, height: 100 }}
					component="img"
					image={image}
					alt={title}
					style={{ objectFit: 'contain', width: '100%', marginRight: '16px' }}
				/>
				<ListItemText
					primary={title}
					secondary={`Цена: $${price.toFixed(2)}`}
					sx={{ maxWidth: '70%' }}
				/>

				<Divider
					orientation="vertical"
					flexItem
					sx={{
						mx: 1,
						height: '50%',
					}}
				/>
				{isAvailable ? (
					<TextField
						size="small"
						variant="filled"
						sx={{ maxWidth: '8%' }}
						type="number"
						value={quantity}
						onChange={(e) => handleQuantityChange(e.target.value)}
						inputProps={{ min: 1 }}
						onInput={(e) => {
							e.preventDefault();
							const value = Math.max(1, parseInt(e.target.value, 10));
							e.target.value = value;
							handleQuantityChange(value);
						}}
					/>
				) : (
					<ListItemText sx={{ maxWidth: '15%' }} primary={'Нет в наличии'} />
				)}
				<Divider
					orientation="vertical"
					flexItem
					sx={{
						mx: 1,
						height: '50%',
					}}
				/>
				<ListItemText
					sx={{ maxWidth: '15%' }}
					primary={`Сумма: $${calculateTotal()}`}
				/>
				<ListItemSecondaryAction>
					<IconButton
						edge="end"
						aria-label="delete"
						onClick={() => handleRemoveFromCart(cartId, productId)}
					>
						<HighlightOffIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
		</Paper>
	);
};
