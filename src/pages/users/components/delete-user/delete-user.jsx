import { useDeleteUserMutation } from '../../../../redux';
import { ErrorAlert } from '../../../../components';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../slice/auth-slice';
import Button from '@mui/material/Button';

export const DeleteUser = ({ userId }) => {
	const [deleteUser, { isLoading }] = useDeleteUserMutation();
	const user = useSelector(selectCurrentUser);

	const handleDeleteUser = async (userId) => {
		try {
			await deleteUser(userId);
		} catch (error) {
			<ErrorAlert error={error} />;
		}
	};

	const isCurrentUser = user?.id === userId;

	return (
		<Button
			onClick={() => handleDeleteUser(userId)}
			disabled={isLoading || isCurrentUser}
		>
			Удалить
		</Button>
	);
};
