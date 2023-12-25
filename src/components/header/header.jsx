import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { Login, Logout, ShoppingBasket } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import { useEffect } from 'react';
import { useLogoutMutation } from '../../redux';

export const Header = () => {
	const navigate = useNavigate();
	const { user } = useAuth();
	const [logout, { isLoading }] = useLogoutMutation();

	useEffect(() => {
		console.log(user);
	}, [user]);

	const onLogout = async () => {
		try {
			await logout();
			document.cookie =
				'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
			window.location.reload();
		} catch (error) {
			console.error('Ошибка при logout:', error);
		}
	};

	return (
		<AppBar position="static">
			<Toolbar>
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
