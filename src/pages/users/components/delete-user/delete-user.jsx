import { useState } from 'react';
import { useDeleteUserMutation } from '../../../../redux';
import { Notification } from '../../../../components';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../slice/auth-slice';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export const DeleteUser = ({ userId }) => {
	const [notification, setNotification] = useState(null);
	const [deleteUser, { isLoading }] = useDeleteUserMutation();
	const user = useSelector(selectCurrentUser);

	const handleDeleteUser = async (userId) => {
		try {
			await deleteUser(userId);
			setNotification({
				message: 'Удаление пользователя выполнено успешно!',
				type: 'success',
			});
		} catch (error) {
			console.error('Ошибка при удалении пользователя:', error);
			setNotification({
				message: 'Возникла ошибка при удалении пользователя!',
				type: 'error',
			});
		}
	};

	const isCurrentUser = user?.id === userId;

	return (
		<Box>
			<Button
				onClick={() => handleDeleteUser(userId)}
				disabled={isLoading || isCurrentUser}
			>
				{isLoading ? 'Удаление...' : 'Удалить'}
			</Button>
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
