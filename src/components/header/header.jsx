import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { Login, Logout, ShoppingBasket, Home } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../redux';
import { selectCurrentUser } from '../../features/auth-slice';
import { useSelector } from 'react-redux';

export const Header = () => {
	const navigate = useNavigate();
	const [logout, { isLoading }] = useLogoutMutation();
	const user = useSelector(selectCurrentUser);

	const onLogout = async () => {
		try {
			await logout();
			window.location.reload();
		} catch (error) {
			console.error('Ошибка при logout:', error);
		}
	};

	return (
		<AppBar position="static">
			<Toolbar>
				<IconButton color="inherit" onClick={() => navigate('/')}>
					<Home />
				</IconButton>
				<Typography variant="h5" component="span" sx={{ flexGrow: 1 }}>
					Online Shop
				</Typography>
				<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
					{user ? (
						<>
							<IconButton color="inherit">
								<ShoppingBasket />
							</IconButton>
							<IconButton
								color="inherit"
								onClick={() => onLogout()}
								disabled={isLoading}
							>
								<Logout />
							</IconButton>
						</>
					) : (
						<IconButton color="inherit" onClick={() => navigate('/login')}>
							<Login />
						</IconButton>
					)}
				</Box>
			</Toolbar>
		</AppBar>
	);
};
