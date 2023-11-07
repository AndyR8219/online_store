import { generateDate } from '../utils';
import { URL } from '../constants';

export const addUser = (login, password) =>
	fetch(URL.USERS, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json; charset=utf-8',
		},
		body: JSON.stringify({
			login,
			password,
			registed_at: generateDate(),
			role_id: 1,
		}),
	}).then((createdUser) => createdUser.json());
