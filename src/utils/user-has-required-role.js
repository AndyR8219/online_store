export const userHasRequiredRole = (user, role) => {
	return role.includes(user?.roleId);
};
