import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useGetProductsQuery } from '../../redux';

const ProductContainer = ({ className }) => {
	const params = useParams();
	const { data, isLoading } = useGetProductsQuery(params.id);

	return (
		<>
			{!isLoading ? (
				<>
					{data.map(
						({
							id,
							title,
							price,
							quantity,
							category,
							image_url,
							description,
						}) => (
							<div className={className} key={id}>
								<div className="img">
									<img src={image_url} alt={title} />
								</div>
								<div className="product-info">
									<h3 className="title">{title}</h3>
									<div className="price">{price}</div>
									<p className="description">{description}</p>
									<span className="category">{category}</span>
									<div className="quantity">{quantity}</div>
								</div>
								<div className="button">
									<button>Купить</button>
								</div>
							</div>
						),
					)}
				</>
			) : (
				<div className="no-posts-found">Загрузка... </div>
			)}
		</>
	);
};

export const Product = styled(ProductContainer)`
	display: grid;
	grid-template-columns: 1fr 6fr 1fr;

	& .img {
		background-color: #ecdbdb;
	}

	& img {
		width: 150px;
		margin: 30px;
	}

	& .product-info {
		background-color: #e9ecdb;
	}

	& .button {
		background-color: #dbe6ec;
	}
`;
