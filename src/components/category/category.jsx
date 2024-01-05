import { useDispatch } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

export const Category = ({ categories, checked, setChecked }) => {
	const dispatch = useDispatch();

	const handleToggle = (id) => {
		const currentIndex = checked.indexOf(id);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(id);
		} else {
			newChecked.splice(currentIndex, 1);
		}
		dispatch(setChecked(newChecked));
	};

	return (
		<List sx={{ width: '100%', maxWidth: 320, bgcolor: 'background.paper' }}>
			{categories.map(({ id, title }) => {
				const labelId = `checkbox-list-label-${title}`;

				return (
					<ListItem key={id} disablePadding>
						<ListItemButton
							role={undefined}
							onClick={() => handleToggle(id)}
							dense
						>
							<ListItemIcon>
								<Checkbox
									edge="start"
									checked={checked.indexOf(id) !== -1}
									tabIndex={-1}
									disableRipple
									inputProps={{ 'aria-labelledby': labelId }}
								/>
							</ListItemIcon>
							<ListItemText id={labelId} primary={title} />
						</ListItemButton>
					</ListItem>
				);
			})}
		</List>
	);
};
