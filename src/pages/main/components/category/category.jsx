import { useDispatch } from 'react-redux';
import {
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	Checkbox,
	ListItemText,
} from '@mui/material';

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
