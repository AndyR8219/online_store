import { createSlice } from '@reduxjs/toolkit';

export const categoriesSlice = createSlice({
	name: 'categories',
	initialState: {
		checked: [],
	},
	reducers: {
		setChecked: (state, action) => {
			state.checked = action.payload;
		},
	},
});

export const { setChecked } = categoriesSlice.actions;
export const selectCheckedCategories = (state) => state.categories.checked;

export default categoriesSlice.reducer;
