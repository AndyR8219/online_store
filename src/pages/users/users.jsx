import { useGetUserRoleQuery, useGetUsersQuery } from '../../redux';
import { SelectRole, DeleteUser } from './components';
import { ErrorAlert, Loading } from '../../components';
import { formatDate } from './utils/format-date';
import { formatUsersRoles } from './utils/format-users-roles';
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

	if (isUsersLoading || isRolesLoading) {
		return <Loading />;
	}

	if (usersError || rolesError) {
		return <ErrorAlert errors={[usersError, rolesError]} />;
	}

	const users = dataUsers.data || [];
	const roles = dataRoles.data || [];

	const rows = formatUsersRoles(users, roles);

	const commonHeaderCellStyle = {
		width: '25%',
		fontSize: 20,
	};

	return (
		<Box sx={{ minWidth: 650, maxWidth: 1000, m: '0 auto' }}>
			<TableContainer component={Paper} sx={{ mt: 5 }}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow sx={{ width: '25%', fontSize: 20 }}>
							<TableCell sx={commonHeaderCellStyle}>Логин</TableCell>
							<TableCell sx={commonHeaderCellStyle} align="right">
								Дата регистрации
							</TableCell>
							<TableCell sx={commonHeaderCellStyle} align="right">
								Роль
							</TableCell>
							<TableCell sx={commonHeaderCellStyle} align="right">
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
