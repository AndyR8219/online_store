import { Loading, Search, Category } from '../../components';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { setChecked, selectCheckedCategories } from '../../slice/categories-slise';
import { useGetProductsQuery } from '../../redux';
import { ProductRow } from './components';
import { LIMIT_PRODUCT_LIST } from '../../constants';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';

export const ProductList = () => {
	const [search, setSearch] = useState('');
	const checked = useSelector(selectCheckedCategories);
	const [page, setPage] = useState(1);

	const categoriesParam =
		checked.length > 0 ? encodeURIComponent(JSON.stringify(checked)) : '';

	const { data, isLoading } = useGetProductsQuery({
		search: search,
		categories: categoriesParam,
		page: page,
		limit: LIMIT_PRODUCT_LIST,
	});

	if (isLoading) return <Loading />;

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
