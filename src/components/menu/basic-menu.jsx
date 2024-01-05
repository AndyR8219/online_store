import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, selectCurrentUser } from '../../slice/auth-slice';
import { Logout, Person, Group, InventorySharp } from '@mui/icons-material';
import { useLogoutMutation } from '../../redux';
import { ROLE } from '../../constants/role';
import { useNavigate } from 'react-router-dom';

export const BasicMenu = ({ children, setAnchorEl, anchorEl, open }) => {
	const user = useSelector(selectCurrentUser);
	const [logout, { isLoading }] = useLogoutMutation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleClose = () => {
		setAnchorEl(null);
	};

	const onLogout = async () => {
		try {
			handleClose();
			await logout();
			dispatch(logOut());
			navigate('/');
		} catch (error) {
			console.error('Ошибка при logout:', error);
		}
	};

	const pageToUsers = () => {
		handleClose();
		navigate('/users');
	};

	const pageToProductsList = () => {
		handleClose();
		navigate('/products_list');
	};

	const roleAdmin = user?.roleId === ROLE.ADMIN;

	return (
		<div>
			{children}
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem onClick={handleClose}>
					<IconButton color="inherit">
						<Person />
					</IconButton>
					Профиль
				</MenuItem>
				{roleAdmin && (
					<Box>
						<MenuItem onClick={pageToUsers}>
							<IconButton color="inherit">
								<Group />
							</IconButton>
							Пользователи
						</MenuItem>
						<MenuItem onClick={pageToProductsList}>
							<IconButton color="inherit">
								<InventorySharp />
							</IconButton>
							Товары
						</MenuItem>
					</Box>
				)}
				<MenuItem onClick={onLogout} disabled={isLoading}>
					<IconButton color="inherit">
						<Logout />
					</IconButton>
					Выйти
				</MenuItem>
			</Menu>
		</div>
	);
};
