import * as yup from 'yup';

export const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/^\w+$/, 'Неверный логин')
		.min(3, 'Неверный заполнен логин. Минимум 3 символа')
		.max(15, 'Неверный заполнен логин. Максимум 15 символов'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнен пароль. Допускаются буквы, цифры и знаки # %',
		)
		.min(6, 'Неверный заполнен пароль. Минимум 8 символа')
		.max(30, 'Неверный заполнен пароль. Максимум 30 символов'),
});