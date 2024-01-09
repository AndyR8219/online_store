import { useState } from 'react';
import { useAddProductToCart } from '../../../../hooks';
import { useNavigate } from 'react-router-dom';
import { Notification } from '../../../../components';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export const ProductItem = (props) => {
	const navigate = useNavigate();
	const [notification, setNotification] = useState(null);
	const handledProductToCart = useAddProductToCart();
	const { imageUrl, price, title, id } = props.product;

	const handledToCart = () => {
		try {
			handledProductToCart(id);
			setNotification({
				message: 'Товара добавлен в корзину!',
				type: 'success',
			});
		} catch (error) {
			console.error(error);
			setNotification({
				message: 'Возникла ошибка при добавлении товара в корзину!',
				type: 'error',
			});
		}
	};

	return (
		<Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
			<CardActionArea onClick={() => navigate(`/product/${id}`)}>
				<CardMedia
					sx={{ maxWidth: 345, height: 300 }}
					image={imageUrl}
					component="img"
					alt={title}
					style={{ objectFit: 'contain', width: '100%' }}
				/>
				<CardContent sx={{ flexGrow: 1 }}>
					<Typography variant="h6" component="h3" noWrap>
						{title}
					</Typography>
					<Typography variant="body1" component="span">
						Цена: {price} $
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button size="small" color="primary" onClick={handledToCart}>
					В корзину
				</Button>
			</CardActions>
			{notification && (
				<Notification
					message={notification.message}
					type={notification.type}
					onClose={() => setNotification(null)}
				/>
			)}
		</Card>
	);
};
