import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../slice/auth-slice';
import { ROLE } from '../../constants';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

export const ProfilePage = () => {
	const user = useSelector(selectCurrentUser);
	console.log(user);
	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
			<Paper sx={{ padding: 4, maxWidth: 400 }}>
				<Avatar
					sx={{ width: 100, height: 100, margin: '0 auto' }}
					alt="User Avatar"
					src={user?.avatarUrl}
				/>
				<Typography variant="h5" sx={{ textAlign: 'center', marginTop: 2 }}>
					{user?.login}
				</Typography>
				<Typography
					variant="subtitle1"
					sx={{ textAlign: 'center', color: 'text.secondary' }}
				>
					{`${user?.login}@freemail.com`}
				</Typography>
				<Typography variant="body1" sx={{ marginTop: 2 }}>
					Дополнительная информация о пользователе.
				</Typography>
				<Typography variant="body1" sx={{ marginTop: 2 }}>
					{`Зарегестрирован ${user?.createdAt}`}
				</Typography>
				<Typography variant="body1" sx={{ marginTop: 2 }}>
					{`Текущая роль ${Object.keys(ROLE).find(
						(key) => ROLE[key] === user?.roleId,
					)}`}
				</Typography>
				<Box
					sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}
				></Box>
			</Paper>
		</Box>
	);
};
