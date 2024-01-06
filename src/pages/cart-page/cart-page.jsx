import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export const CartPage = () => {
	// Предположим, у вас есть массив объектов с данными о покупках
	const cartItems = [
		{ id: 1, name: 'Product 1', price: 19.99, quantity: 2 },
		{ id: 2, name: 'Product 2', price: 29.99, quantity: 1 },
		// Добавьте другие элементы, если необходимо
	];

	// Функция для удаления товара из корзины
	const removeFromCart = (itemId) => {
		// Ваша логика удаления товара из корзины
		console.log(`Удалить товар с id ${itemId} из корзины`);
	};

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
			<Paper sx={{ padding: 4, width: 600 }}>
				<Typography variant="h5" sx={{ textAlign: 'center', marginBottom: 2 }}>
					Корзина
				</Typography>
				<List>
					{cartItems.map((item) => (
						<Box key={item.id}>
							<ListItem>
								<ListItemText
									primary={item.name}
									secondary={`Цена: $${item.price.toFixed(2)}`}
								/>
								<ListItemSecondaryAction>
									<IconButton
										edge="end"
										aria-label="delete"
										onClick={() => removeFromCart(item.id)}
									>
										<HighlightOffIcon />
									</IconButton>
								</ListItemSecondaryAction>
							</ListItem>
							<Divider />
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
			</Paper>
		</Box>
	);
};
