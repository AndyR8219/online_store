import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { useGetProductByIdQuery } from '../../redux';
import { useParams } from 'react-router-dom';

export const Product = () => {
	const params = useParams();
	const { data, isLoading, isError } = useGetProductByIdQuery(params.id);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError || !data || !data.data) {
		return <div>Error loading product details</div>;
	}

	const { title, price, description, imageUrl } = data.data;

	return (
		<>
			<Card style={{ display: 'flex', margin: '16px' }}>
				<CardMedia
					component="img"
					alt="Product Image"
					height="200"
					image={imageUrl}
					style={{ width: '45%', height: '500px', objectFit: 'contain' }}
				/>
				<CardContent style={{ flex: '1 0 auto', width: '55%' }}>
					<Typography
						variant="h5"
						gutterBottom
						style={{ fontWeight: 'bold', wordWrap: 'break-word' }}
					>
						{title}
					</Typography>
					<Typography variant="h6" color="textSecondary">
						Цена: {`$ ${price}`}
					</Typography>
					<Typography
						sx={{ mt: '1rem' }}
						variant="body1"
						paragraph
						style={{ overflowWrap: 'break-word' }}
					>
						{description}
					</Typography>
					<Typography variant="subtitle1" color="textSecondary">
						{'В наличии'}
					</Typography>
					<Button variant="contained" color="primary">
						В корзину
					</Button>
				</CardContent>
			</Card>

			<Card style={{ margin: '16px' }}>
				<CardContent>
					<Typography variant="h6" gutterBottom>
						Комментарии к товару
					</Typography>
					{/* Вставьте компоненты для отображения комментариев */}
					<Typography variant="body1">
						Здесь могут быть ваши комментарии к товару. Пример: "Отличный
						товар!", "Быстрая доставка" и т.д.
					</Typography>
				</CardContent>
			</Card>
		</>
	);
};
