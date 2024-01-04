import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const ErrorAlert = ({ error }) => (
	<Box
		sx={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			height: '100vh',
		}}
	>
		<Alert severity="error" sx={{ maxWidth: 400 }}>
			<AlertTitle>Ошибка</AlertTitle>
			{error && <Typography variant="body1">{error.message}</Typography>}
		</Alert>
	</Box>
);
