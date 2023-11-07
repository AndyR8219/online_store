import { URL } from '../constants';

export const addSession = (hash, user) =>
	fetch(URL.SESSIONS, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			hash,
			user,
		}),
	});
