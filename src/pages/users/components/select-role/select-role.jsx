import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useUpdateUserRoleMutation } from '../../../../redux/api-slice';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../slice/auth-slice';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SelectRole = ({ roles, roleId, userId }) => {
	const [updateUserRole, { isLoading }] = useUpdateUserRoleMutation();
	const user = useSelector(selectCurrentUser);
	const [snackbarOpen, setSnackbarOpen] = useState(false);

	const handleRoleChange = async ({ target }) => {
		const newRoleId = target.value;
		try {
			await updateUserRole({ userId, roleId: newRoleId });
			setSnackbarOpen(true);
		} catch (error) {
			console.error('Ошибка при изменении роли', error);
		}
	};

	const isCurrentUser = user?.id === userId;

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setSnackbarOpen(false);
	};

	return (
		<Box sx={{ maxWidth: 120, marginLeft: 'auto' }}>
			<FormControl fullWidth>
				<NativeSelect
					value={roleId}
					onChange={handleRoleChange}
					inputProps={{
						name: 'role',
						id: 'uncontrolled-native',
					}}
					disabled={isLoading || isCurrentUser}
				>
					{roles.map((element) => (
						<option key={element.id} value={element.id}>
							{element.name}
						</option>
					))}
				</NativeSelect>
			</FormControl>
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={2000}
				onClose={handleSnackbarClose}
			>
				<Alert onClose={handleSnackbarClose} severity="success">
					Роль успешно изменена!
				</Alert>
			</Snackbar>
		</Box>
	);
};
