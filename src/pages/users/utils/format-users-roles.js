export const formatUsersRoles = (users, roles) => {
	return users.map((user) => {
		const role = roles.find((el) => el.id === user.roleId);
		return {
			login: user.login,
			registredAt: user.createdAt,
			roleId: user.roleId,
			role: role ? role.name : '',
			userId: user.id,
		};
	});
};
