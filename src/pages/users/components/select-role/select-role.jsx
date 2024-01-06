import React, { useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useUpdateUserRoleMutation } from '../../../../redux/api-slice';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../slice/auth-slice';
import { Notification } from '../../../../components';

export const SelectRole = ({ roles, roleId, userId }) => {
	const [notification, setNotification] = useState(null);
	const [updateUserRole, { isLoading }] = useUpdateUserRoleMutation();
	const user = useSelector(selectCurrentUser);

	const handleRoleChange = async ({ target }) => {
		const newRoleId = target.value;
		try {
			await updateUserRole({ userId, roleId: newRoleId });
			setNotification({ message: 'Роль успешно изменена!', type: 'success' });
		} catch (error) {
			setNotification({ message: 'Ошибка при изменении роли!', type: 'error' });
			console.error('Ошибка при изменении роли', error);
		}
	};

	const isCurrentUser = user?.id === userId;

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
			{notification && (
				<Notification
					message={notification.message}
					type={notification.type}
					onClose={() => setNotification(null)}
				/>
			)}
		</Box>
	);
};
