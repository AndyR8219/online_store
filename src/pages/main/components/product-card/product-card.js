import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ProductCardContainer = ({
	className,
	id,
	title,
	price,
	quantity,
	category,
	image_url,
}) => {
	const navigate = useNavigate();

	return (
		<article className={className} onClick={() => navigate(`product/${id}`)}>
			<div class="filters__img">
				<img src={image_url} alt={title} />
			</div>
			<div className="product-card-info">
				<p className="price">{price}$</p>
				<h4>{title}</h4>
			</div>
		</article>
	);
};

export const ProductCard = styled(ProductCardContainer)`
	display: flex;
	flex-direction: column;
	width: 280px;
	margin: 20px;
	border: 1px solid #000;

	& .filters__img {
		width: 90%;
		height: 200px;
		overflow: hidden;
		margin: 10px;
	}

	& .filters__img img {
		width: initial;
		height: 100%;
	}

	& .price {
		color: #e9043e;
		font-size: 20px;
	}
`;
