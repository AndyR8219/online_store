import styled from 'styled-components';
import { Search } from '../../components';
import { ProductCard } from './components';
import { useGetProductsQuery } from '../../redux';

const MainContainer = ({ className }) => {
	const { data: products = [], isLoading } = useGetProductsQuery();
	return (
		<div className={className}>
			<Search placeholder="Поиск по заголовкам..." />
			<div className="body-main">
				<div className="category-block"></div>
				<div className="product-block">
					<div className="sort-by-cost">
						<Search placeholder="От..." width="200px" margin="20px" />
						<Search placeholder="До..." width="200px" margin="20px" />
					</div>
					{!isLoading ? (
						<div className="products-list">
							{products.map(
								({ id, title, price, quantity, category, image_url }) => (
									<ProductCard
										key={id}
										id={id}
										title={title}
										price={price}
										quantity={quantity}
										category={category}
										image_url={image_url}
									/>
								),
							)}
						</div>
					) : (
						<div className="no-posts-found">Загрузка... </div>
					)}
				</div>
			</div>
		</div>
	);
};

export const Main = styled(MainContainer)`
	& .body-main {
		display: inline-flex;
		margin-top: 40px;
		height: 700px;
		width: 100%;
		background-color: #ccc;
	}

	& .category-block {
		width: 35%;
		height: 100%;
		background-color: #e6e6f0;
	}

	& .product-block {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	& .sort-by-cost {
		display: flex;
		justify-content: center;
	}

	& .products-list {
		display: flex;
		flex-wrap: wrap;
	}
`;
