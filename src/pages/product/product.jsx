import { useState } from 'react';
import { useAddCommentMutation, useGetProductByIdQuery } from '../../redux';
import { useParams } from 'react-router-dom';
import { Loading, Notification } from '../../components';
import { selectCurrentUser } from '../../slice/auth-slice';
import { useSelector } from 'react-redux';
import { useAddProductToCart } from '../../hooks';
import { Comment } from './components';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export const Product = () => {
	const params = useParams();
	const user = useSelector(selectCurrentUser);
	const [notification, setNotification] = useState(null);
	const [newComment, setNewComment] = useState('');
	const { data, isLoading, isError } = useGetProductByIdQuery(params.id);
	const handledProductToCart = useAddProductToCart();
	const [addComment] = useAddCommentMutation();

	if (isLoading) {
		return <Loading />;
	}

	if (isError || !data || !data.data) {
		return <Alert severity="error">Ошибка загрузки товара</Alert>;
	}
	const { title, price, description, imageUrl, id: productId, comments } = data.data;

	const handleCommentSubmit = async () => {
		await addComment({ productId, content: newComment });

		setNewComment('');
	};

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
					<Button
						variant="contained"
						color="primary"
						onClick={() => handledProductToCart(setNotification, productId)}
					>
						В корзину
					</Button>
				</CardContent>
				{notification && (
					<Notification
						message={notification.message}
						type={notification.type}
						onClose={() => setNotification(null)}
					/>
				)}
			</Card>

			<Card style={{ margin: '16px' }}>
				<CardContent>
					<Typography variant="h6" gutterBottom>
						Комментарии к товару
					</Typography>
					{user && (
						<>
							<TextField
								label="Добавить комментарий"
								variant="outlined"
								fullWidth
								multiline
								rows={4}
								value={newComment}
								onChange={(e) => setNewComment(e.target.value)}
							/>

							<Button
								variant="contained"
								color="primary"
								style={{ marginTop: '16px' }}
								onClick={handleCommentSubmit}
							>
								Отправить комментарий
							</Button>
						</>
					)}
				</CardContent>
			</Card>
			<Card style={{ margin: '16px' }}>
				<Comment comments={comments} productId={productId} user={user} />
			</Card>
		</>
	);
};
