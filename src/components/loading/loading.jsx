import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export const Loading = () => (
	<Box
		sx={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			height: '100vh',
		}}
	>
		<CircularProgress />
	</Box>
);
