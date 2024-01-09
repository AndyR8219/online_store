export const formatDate = (dateString) => {
	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	};
	const formattedDate = new Date(dateString).toLocaleDateString('ru-RU', options);
	return formattedDate;
};
