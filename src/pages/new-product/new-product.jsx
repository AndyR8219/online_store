import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userHasRequiredRole } from '../../utils';
import { ROLE } from '../../constants';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../slice/auth-slice';
import { ErrorHandling, Notification } from '../../components';
import { useAddProductMutation } from '../../redux';
import { validateFormProduct } from '../../validations';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export const NewProduct = () => {
	const navigate = useNavigate();
	const user = useSelector(selectCurrentUser);
	const [error, setError] = useState(null);
	const [notification, setNotification] = useState(null);
	const [addProduct, { isLoading }] = useAddProductMutation();

	const [product, setProduct] = useState({
		title: '',
		imageUrl: '',
		price: '',
		quantity: '',
		category: '',
		description: '',
	});

	const [errors, setErrors] = useState({
		title: '',
		imageUrl: '',
		price: '',
		quantity: '',
		category: '',
		description: '',
	});

	useEffect(() => {
		if (!userHasRequiredRole(user, [ROLE.ADMIN])) {
			return setError({
				error: 'Ошибка аутентификации',
				message: 'Доступ запрещен!',
			});
		} else {
			setError(null);
		}
	}, [user]);

	const handleInputChange = (field, value) => {
		setProduct((prevProduct) => ({
			...prevProduct,
			[field]: value,
		}));

		setErrors((prevErrors) => ({
			...prevErrors,
			[field]: '',
		}));
	};

	const handleSave = async () => {
		if (!validateFormProduct(errors, setErrors, product)) {
			return;
		}
		try {
			await addProduct(product);
			setNotification({
				message: 'Добавление товара выполнено успешно!',
				type: 'success',
			});
		} catch (err) {
			console.error('Ошибка при добавлении товара:', err);
			setNotification({
				message: 'Возникла ошибка при добавлении товара!',
				type: 'error',
			});
		}
	};

	return error ? (
		<ErrorHandling error={error.error} message={error.message} />
	) : (
		<Container>
			<Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
				<Typography variant="h5" sx={{ mb: 3 }}>
					Добавление товара
				</Typography>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<TextField
							fullWidth
							required
							label="Название товара"
							value={product.title}
							onChange={(e) => handleInputChange('title', e.target.value)}
							error={!!errors.title}
							helperText={errors.title}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							required
							label="Ссылка для картинки"
							value={product.imageUrl}
							onChange={(e) =>
								handleInputChange('imageUrl', e.target.value)
							}
							error={!!errors.imageUrl}
							helperText={errors.imageUrl}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							required
							type="number"
							label="Цена"
							value={product.price}
							onChange={(e) => handleInputChange('price', e.target.value)}
							error={!!errors.price}
							helperText={errors.price}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							required
							type="number"
							label="Количество"
							value={product.quantity}
							onChange={(e) =>
								handleInputChange('quantity', e.target.value)
							}
							error={!!errors.quantity}
							helperText={errors.quantity}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							required
							label="Категория"
							value={product.category}
							onChange={(e) =>
								handleInputChange('category', e.target.value)
							}
							error={!!errors.category}
							helperText={errors.category}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							required
							label="Описание"
							multiline
							rows={10}
							value={product.description}
							onChange={(e) =>
								handleInputChange('description', e.target.value)
							}
							error={!!errors.description}
							helperText={errors.description}
						/>
					</Grid>
					<Grid item xs={12}>
						<Button
							variant="contained"
							color="primary"
							disabled={isLoading}
							onClick={handleSave}
						>
							Сохранить
						</Button>
						<Button
							variant="contained"
							color="secondary"
							disabled={isLoading}
							onClick={() => navigate(-1)}
							sx={{ ml: 2 }}
						>
							Назад
						</Button>
					</Grid>
				</Grid>
			</Paper>
			{notification && (
				<Notification
					message={notification.message}
					type={notification.type}
					onClose={() => setNotification(null)}
				/>
			)}
		</Container>
	);
};
