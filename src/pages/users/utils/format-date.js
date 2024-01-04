export const formatDate = (dateString) => {
	return new Date(dateString).toLocaleString('ru', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
};
