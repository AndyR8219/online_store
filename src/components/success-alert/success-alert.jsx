import React from 'react';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SuccessAlert = ({ message, snackbarOpen, setSnackbarOpen }) => {
	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setSnackbarOpen(false);
	};
	return (
		<Snackbar
			open={snackbarOpen}
			autoHideDuration={2000}
			onClose={handleSnackbarClose}
		>
			<Alert onClose={handleSnackbarClose} severity="success">
				{message}
			</Alert>
		</Snackbar>
	);
};
