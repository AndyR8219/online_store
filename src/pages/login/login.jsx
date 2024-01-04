import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useLoginUserMutation } from '../../redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../../slice/auth-slice';
import { useDispatch } from 'react-redux';
import { authFormSchema } from '../../validations/';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export const Login = () => {
	const [serverError, setServerError] = useState(null);
	const [loginUser, { isLoading }] = useLoginUserMutation();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const dispatch = useDispatch();

	const handleRegister = () => {
		navigate('/register');
	};

	const onSubmit = async ({ login, password }) => {
		try {
			const {
				data: { user },
			} = await loginUser({ login, password });
			dispatch(setCredentials({ user }));
			navigate('/');
		} catch (error) {
			setServerError(error.message || 'Произошла ошибка при авторизации');
		}
	};

	return (
		<>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Авторизация
					</Typography>
					<Box
						component="form"
						noValidate
						sx={{ mt: 1 }}
						onSubmit={handleSubmit(onSubmit)}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="login"
							label="Введите логин"
							type="login"
							name="login"
							autoComplete="login"
							autoFocus
							{...register('login', {
								onChange: () => setServerError(null),
							})}
							error={!!errors.login}
							helperText={errors.login?.message}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Введите пароль"
							type="password"
							id="password"
							autoComplete="current-password"
							{...register('password', {
								onChange: () => setServerError(null),
							})}
							error={!!errors.password}
							helperText={errors.password?.message}
						/>
						<Button
							type="submit"
							variant="contained"
							fullWidth
							sx={{ mt: 3, mb: 2 }}
							disabled={isLoading}
						>
							Войти
						</Button>
						<Box>
							<Link href="#" underline="hover" onClick={handleRegister}>
								Зарегистрироваться
							</Link>
						</Box>
						{serverError && <Alert severity="error">{serverError}</Alert>}
					</Box>
				</Box>
			</Container>
		</>
	);
};
