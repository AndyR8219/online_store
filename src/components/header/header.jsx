import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { Login } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
	const navigate = useNavigate();
	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h5" component="span" sx={{ flexGrow: 1 }}>
					Online Shop
				</Typography>
				<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
					{/* <IconButton color="inherit">
						<ShoppingBasket />
					</IconButton> */}
					<IconButton color="inherit">
						<Login onClick={navigate('/login')} />
					</IconButton>
					{/* <IconButton color="inherit">
						<Logout />
					</IconButton> */}
				</Box>
			</Toolbar>
		</AppBar>
	);
};
