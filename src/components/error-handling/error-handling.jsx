import Alert from '@mui/material/Alert';

export const ErrorHandling = ({ error, message }) => {
	return error ? <Alert severity="error">{message}</Alert> : null;
};
