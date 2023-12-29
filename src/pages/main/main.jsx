import { useGetProductsQuery } from '../../redux';
import { Search } from '../../components';
import { ProductItem, Category } from './components';
import { useState } from 'react';
import { setChecked, selectCheckedCategories } from '../../features/categories-slise';
import { useSelector } from 'react-redux';
import {
	Alert,
	Box,
	Card,
	CircularProgress,
	Container,
	Grid,
	Pagination,
	Stack,
} from '@mui/material';

export const Main = () => {
	const [search, setSearch] = useState('');
	const checked = useSelector(selectCheckedCategories);
	const [page, setPage] = useState(1);

	const categoriesParam =
		checked.length > 0 ? encodeURIComponent(JSON.stringify(checked)) : '';

	const { data, isLoading, isError } = useGetProductsQuery({
		search: search,
		categories: categoriesParam,
		page: page,
	});

	if (isLoading)
		return (
			<Box sx={{ display: 'flex' }}>
				<CircularProgress />
			</Box>
		);

	if (isError) {
		return <Alert severity="error">Произошла ошибка при загрузке данных!</Alert>;
	}

	const lastPage = data?.lastPage || 1;
	const categories = data?.categories || [];
	const products = data?.products || [];

	const handleChange = ({ target }) => {
		setSearch(target.value);
	};

	const handlePage = (_, value) => {
		setPage(value);
	};

	return (
		<Container sx={{ mt: '1rem', width: '100%' }}>
			<Search value={search} onChange={handleChange} />
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
					<Box>
						<Grid container spacing={3}>
							{isLoading
								? 'Загрузка'
								: products.map((product) => (
										<Grid
											item
											key={product.id}
											xs={12}
											sm={6}
											md={5}
											lg={4}
										>
											<ProductItem product={product} />
										</Grid>
								  ))}
						</Grid>
					</Box>
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
