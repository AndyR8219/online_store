import { useGetProductsQuery } from '../../redux';
import { Search } from '../../components';
import { useState } from 'react';
import { Box, Card, Container, Grid } from '@mui/material';
import { ProductItem, Category } from './components';

export const Main = () => {
	const { data, isLoading } = useGetProductsQuery();
	const [search, setSearch] = useState('');

	if (isLoading) return <div>Загрузка...</div>;

	const handleChange = ({ target }) => {
		setSearch(target.value);
	};

	return (
		<Container sx={{ mt: '1rem', width: '100%' }}>
			<Search value={search} onChange={handleChange} />
			<Grid container spacing={2} wrap="nowrap">
				<Grid item lg={3}>
					<Card style={{ height: '100%' }}>
						<Category />
					</Card>
				</Grid>
				<Grid item xs={10}>
					<Box>
						<Grid container spacing={3}>
							{isLoading
								? 'Загрузка'
								: data.data.products.map((product) => (
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
		</Container>
	);
};
