import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCheckTokenQuery } from '../../redux/';
import { clearUser, setUser } from '../../features/auth-slice';

const AuthCheck = () => {
	const dispatch = useDispatch();
	const { data: userData } = useCheckTokenQuery();

	useEffect(() => {
		const checkTokenAndSetUser = async () => {
			try {
				if (userData) {
					dispatch(setUser(userData));
				} else {
					dispatch(clearUser());
				}
			} catch (error) {
				console.error('Error checking token:', error);
			}
		};

		checkTokenAndSetUser();
	}, [userData, dispatch]);

	return null;
};

export default AuthCheck;
