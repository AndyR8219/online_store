import { useGetProductsQuery } from '../../redux';
import { Search } from '../../components';
import { useState } from 'react';
import { Container, Grid } from '@mui/material';
import { ProductItem } from './components';

export const Main = () => {
	const { data, isLoading } = useGetProductsQuery();
	const [search, setSearch] = useState('');

	const handleChange = ({ target }) => {
		setSearch(target.value);
	};

	return (
		<div>
			<Container sx={{ mt: '1rem' }}>
				<Search value={search} onChange={handleChange} />
				<Grid container spacing={3}>
					{isLoading
						? 'Загрузка'
						: data.data.products.map((product) => (
								<ProductItem key={product.id} product={product} />
						  ))}
				</Grid>
			</Container>
		</div>
	);
};
