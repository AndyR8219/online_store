import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCheckTokenQuery } from '../../redux/';
import { logOut, setCredentials } from '../../slice/auth-slice';

const AuthCheck = () => {
	const dispatch = useDispatch();
	const { data: userData } = useCheckTokenQuery();

	useEffect(() => {
		const checkTokenAndSetUser = async () => {
			try {
				if (userData) {
					dispatch(setCredentials(userData));
				} else {
					dispatch(logOut());
				}
			} catch (error) {
				console.error('Ошибка проверки токена:', error);
			}
		};

		checkTokenAndSetUser();
	}, [userData, dispatch]);

	return null;
};

export default AuthCheck;
