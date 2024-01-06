import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const ErrorPage = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
			}}
		>
			<Box sx={{ textAlign: 'center' }}>
				<Typography variant="h1" color="error">
					404 - Страница не найдена
				</Typography>
				<Typography variant="body1">
					Извините, запрошенная вами страница не существует.
				</Typography>
			</Box>
		</Box>
	);
};
