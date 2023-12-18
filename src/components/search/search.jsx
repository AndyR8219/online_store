import { TextField } from '@mui/material';

export const Search = ({ value, onChange }) => {
	return (
		<TextField
			label="Поиск"
			type="search"
			fullWidth
			value={value}
			onChange={onChange}
			sx={{ mb: '1.5rem' }}
		></TextField>
	);
};
