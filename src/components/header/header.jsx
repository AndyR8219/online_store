import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../../slice/auth-slice';
import { useSelector } from 'react-redux';
import { BasicMenu } from '../menu/basic-menu';
import { useState } from 'react';
import { Login, ShoppingBasket, Home, AccountCircle } from '@mui/icons-material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export const Header = () => {
	const navigate = useNavigate();

	const user = useSelector(selectCurrentUser);

	const [anchorEl, setAnchorEl] = useState(null);

	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
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
							<Box
								display="flex"
								justifyContent="center"
								alignItems="center"
							>
								<Typography variant="body1" sx={{ fontSize: 20 }}>
									{user.login}
								</Typography>
							</Box>
							<BasicMenu
								setAnchorEl={setAnchorEl}
								anchorEl={anchorEl}
								open={open}
							>
								<IconButton
									color="inherit"
									id="basic-button"
									aria-controls={open ? 'basic-menu' : undefined}
									aria-haspopup="true"
									aria-expanded={open ? 'true' : undefined}
									onClick={handleClick}
								>
									<AccountCircle />
								</IconButton>
							</BasicMenu>
							<IconButton
								color="inherit"
								onClick={() => navigate(`/cart/${user.cartId}`)}
							>
								<ShoppingBasket />
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
