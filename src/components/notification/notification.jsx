import React, { useState, useEffect } from 'react';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export const Notification = ({ message, type, onClose }) => {
	const [open, setOpen] = useState(true);

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
		onClose && onClose();
	};

	useEffect(() => {
		if (open) {
			const timeoutId = setTimeout(() => {
				setOpen(false);
				onClose && onClose();
			}, 2000);

			return () => clearTimeout(timeoutId);
		}
	}, [open, onClose]);

	return (
		<Snackbar open={open} autoHideDuration={2000} onClose={handleSnackbarClose}>
			<MuiAlert
				onClose={handleSnackbarClose}
				severity={type}
				elevation={6}
				variant="filled"
			>
				{message}
			</MuiAlert>
		</Snackbar>
	);
};
