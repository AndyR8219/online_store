import { Loading, Search, Category, ErrorHandling } from '../../components';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { setChecked, selectCheckedCategories } from '../../slice/categories-slise';
import { useGetProductsQuery } from '../../redux';
import { ProductRow } from './components';
import { LIMIT_PRODUCT_LIST, ROLE } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { userHasRequiredRole } from '../../utils';
import { selectCurrentUser } from '../../slice/auth-slice';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';

export const ProductList = () => {
	const [error, setError] = useState(null);
	const [search, setSearch] = useState('');
	const checked = useSelector(selectCheckedCategories);
	const user = useSelector(selectCurrentUser);
	const [page, setPage] = useState(1);
	const navigate = useNavigate();

	const {
		data,
		isLoading,
		error: dataError,
	} = useGetProductsQuery({
		search: search,
		categories: checked,
		page: page,
		limit: LIMIT_PRODUCT_LIST,
	});

	useEffect(() => {
		if (!userHasRequiredRole(user, [ROLE.ADMIN])) {
			return setError({
				error: 'Ошибка аутентификации',
				message: 'Доступ запрещен!',
			});
		} else if (dataError) {
			return setError({
				error: dataError,
				message: 'Ошибка загрузки товаров!',
			});
		} else {
			setError(null);
		}
	}, [dataError, user]);

	const handlePage = (_, value) => {
		setPage(value);
	};

	if (isLoading) return <Loading />;

	const lastPage = data?.lastPage || 1;
	const categories = data?.categories || [];
	const products = data?.products || [];

	const handleChange = ({ target }) => {
		setSearch(target.value);
	};

	return error ? (
		<ErrorHandling error={error.error} message={error.message} />
	) : (
		<Container sx={{ mt: '1rem', width: '100%' }}>
			<Search value={search} onChange={handleChange} />
			<Box>
				<Button
					variant="contained"
					sx={{ mb: 2 }}
					onClick={() => navigate('/product')}
				>
					Добавить новый товар
				</Button>
			</Box>
			<Grid container spacing={2} wrap="nowrap">
				<Grid item sx={{ width: '200px' }}>
					<Card sx={{ width: '100%', height: '100%' }}>
						<Category
							categories={categories}
							checked={checked}
							setChecked={setChecked}
						/>
					</Card>
				</Grid>
				<Grid item xs={10}>
					<ProductRow products={products} />
				</Grid>
			</Grid>
			<Box sx={{ padding: '3rem', display: 'flex', justifyContent: 'center' }}>
				<Stack spacing={2}>
					<Pagination
						count={lastPage}
						color="primary"
						sx={{ '& .MuiPaginationItem-root': { fontSize: '2rem' } }}
						onChange={handlePage}
					/>
				</Stack>
			</Box>
		</Container>
	);
};
