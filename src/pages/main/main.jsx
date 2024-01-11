import { useGetProductsQuery } from '../../redux';
import { Search, Category } from '../../components';
import { ProductItem } from './components';
import { useState } from 'react';
import { setChecked, selectCheckedCategories } from '../../slice/categories-slise';
import { useSelector } from 'react-redux';
import { Loading } from '../../components';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const Main = () => {
	const [search, setSearch] = useState('');
	const checked = useSelector(selectCheckedCategories);
	const [page, setPage] = useState(1);

	const { data, isLoading, isError } = useGetProductsQuery({
		search: search,
		categories: checked,
		page: page,
	});

	if (isLoading) return <Loading />;

	if (isError) {
		return <Alert severity="error">Произошла ошибка при загрузке данных!</Alert>;
	}

	const { lastPage = 1, categories = [], products = [] } = data || {};

	const handleChange = ({ target }) => {
		if (search) {
			setPage(1);
		}
		setSearch(target.value);
	};

	const handlePage = (_, value) => {
		setPage(value);
	};

	return (
		<Container
			sx={{
				mt: '1rem',
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<Search value={search} onChange={handleChange} />
			<Grid container spacing={2} wrap="nowrap">
				<Grid item>
					<Card sx={{ width: '180px', height: '100%' }}>
						<Category
							categories={categories}
							checked={checked}
							setChecked={setChecked}
						/>
					</Card>
				</Grid>
				<Grid item xs={10}>
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
				</Grid>
			</Grid>
			{products.length === 0 && (
				<Typography variant="h6" sx={{ textAlign: 'center', marginTop: 2 }}>
					Товар отсутствуетв списке
				</Typography>
			)}
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
