import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
} from '@mui/material';

export const ProductItem = (props) => {
	const { imageUrl, price, title } = props.product;
	return (
		<Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
			<CardActionArea>
				<CardMedia
					sx={{ maxWidth: 345, height: 300 }}
					image={imageUrl}
					component="img"
					alt={title}
					height="300"
					style={{ objectFit: 'contain', width: '100%' }}
				/>
				<CardContent sx={{ flexGrow: 1 }}>
					<Typography variant="h6" component="h3" noWrap>
						{title}
					</Typography>
					<Typography variant="body1" component="span">
						Цена: {price} $
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button size="small" color="primary">
					Купить
				</Button>
			</CardActions>
		</Card>
	);
};
