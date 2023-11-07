import { URL } from '../constants';

export const deleteSession = async (sessionId) =>
	fetch(URL.SESSIONS + `/${sessionId}`, {
		method: 'DELETE',
	});
