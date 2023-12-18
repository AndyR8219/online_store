import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Grid,
	Typography,
} from '@mui/material';

export const ProductItem = (props) => {
	console.log(props);
	const { imageUrl, price, title, quantity } = props.product;
	return (
		<Grid item xs={12} md={4}>
			<Card sx={{ maxWidth: 345, height: '100%' }}>
				<CardActionArea>
					<CardMedia
						sx={{ maxWidth: 345, height: 300 }}
						image={imageUrl}
						component="img"
						alt={title}
						height="300"
					/>
					<CardContent>
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
		</Grid>
	);
};
