import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAddUserMutation } from '../../redux';
import { registerFormSchema } from '../../validations';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../slice/auth-slice';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export const Registration = () => {
	const [serverError, setServerError] = useState(null);
	const [registerUser, { isLoading }] = useAddUserMutation();
	const dispatch = useDispatch();
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
		resolver: yupResolver(registerFormSchema),
	});

	const onSubmit = async ({ login, password }) => {
		try {
			const {
				data: { user },
			} = await registerUser({ login, password });
			dispatch(setCredentials({ user }));
			navigate('/');
		} catch (error) {
			setServerError(error.message || 'Произошла ошибка при регистрации');
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
						Регистрация
					</Typography>
					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit(onSubmit)}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12}>
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
							</Grid>
							<Grid item xs={12}>
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
							</Grid>
							<Grid item xs={12}>
								<TextField
									margin="normal"
									required
									fullWidth
									name="confirmPassword"
									label="Повтор пароля"
									type="password"
									id="confirmPassword"
									autoComplete="current-password"
									{...register('confirmPassword', {
										onChange: () => setServerError(null),
									})}
									error={!!errors.confirmPassword}
									helperText={errors.confirmPassword?.message}
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							disabled={isLoading}
						>
							Зарегистрироваться
						</Button>
					</Box>
					{serverError && <Alert severity="error">{serverError}</Alert>}
				</Box>
			</Container>
		</>
	);
};
