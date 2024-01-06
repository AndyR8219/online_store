import { useEffect, useState } from 'react';
import { useGetUserRoleQuery, useGetUsersQuery } from '../../redux';
import { SelectRole, DeleteUser } from './components';
import { ErrorHandling, Loading } from '../../components';
import { formatDate } from './utils/format-date';
import { formatUsersRoles } from './utils/format-users-roles';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../slice/auth-slice';
import { userHasRequiredRole } from '../../utils';
import { ROLE } from '../../constants/role';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

export const Users = () => {
	const user = useSelector(selectCurrentUser);
	const [error, setError] = useState(null);

	const {
		data: dataUsers,
		isLoading: isUsersLoading,
		error: usersError,
	} = useGetUsersQuery();

	const {
		data: dataRoles,
		isLoading: isRolesLoading,
		error: rolesError,
	} = useGetUserRoleQuery();

	useEffect(() => {
		if (!userHasRequiredRole(user, [ROLE.ADMIN])) {
			return setError({
				error: 'Ошибка аутентификации',
				message: 'Доступ запрещен!',
			});
		} else if (usersError) {
			return setError({
				error: usersError,
				message: 'Ошибка загрузки пользователей!',
			});
		} else if (rolesError) {
			return setError({
				error: usersError,
				message: 'Ошибка загрузки ролей!',
			});
		} else {
			setError(null);
		}
	}, [usersError, rolesError, user]);

	if (isUsersLoading || isRolesLoading) {
		return <Loading />;
	}

	const users = dataUsers?.data || [];
	const roles = dataRoles?.data || [];

	const rows = formatUsersRoles(users, roles);

	return error ? (
		<ErrorHandling error={error.error} message={error.message} />
	) : (
		<Box sx={{ minWidth: 650, maxWidth: 1000, m: '0 auto' }}>
			<TableContainer component={Paper} sx={{ mt: 5 }}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow sx={{ width: '25%', fontSize: 20 }}>
							<TableCell sx={{ width: '25%', fontSize: 20 }}>
								Логин
							</TableCell>
							<TableCell sx={{ width: '25%', fontSize: 20 }} align="right">
								Дата регистрации
							</TableCell>
							<TableCell sx={{ width: '25%', fontSize: 20 }} align="right">
								Роль
							</TableCell>
							<TableCell sx={{ width: '25%', fontSize: 20 }} align="right">
								Удалить
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow key={row.login}>
								<TableCell
									component="th"
									scope="row"
									sx={{ width: '25%' }}
								>
									<Typography variant="body1">{row.login}</Typography>
								</TableCell>
								<TableCell align="right" sx={{ width: '25%' }}>
									<Typography variant="subtitle1">
										{formatDate(row.registredAt)}
									</Typography>
								</TableCell>
								<TableCell
									sx={{
										textAlign: 'right',
										paddingRight: '16px',
										width: '25%',
									}}
								>
									<SelectRole
										roles={roles}
										roleId={row.roleId}
										userId={row.userId}
									/>
								</TableCell>
								<TableCell align="right" sx={{ width: '25%' }}>
									<DeleteUser userId={row.userId} />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};
