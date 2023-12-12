//@ts-nocheck
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import {Styled} from "../AuthPage/styled";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import {createTheme, ThemeProvider} from "@mui/material/styles";

import * as React from "react";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

import axios from "axios";
import {baseURL} from "../../core/constants/baseURL";


function Copyright(props: any) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{'Copyright © '}
			<Link color="inherit" href="https://mui.com/">
				Цифровой рубль
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function RegisterPage() {
	const navigate = useNavigate()
	const [errorProperty, setErrorProperty] = useState(false);
	const [isAuthorized, setIsAuthorized] = useState(false)

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		localStorage.setItem('inn', data.get('email'))
		localStorage.setItem('username', data.get('username'))
		localStorage.setItem('password', data.get('password'))

		axios.post(`${baseURL}/auth/sign_up`, {inn: localStorage.getItem('inn'),name: localStorage.getItem('username'), password: localStorage.getItem('password')})
			.then(response => {
				console.log(response.data.authorized)
				if (response.data.authorized) {
					setIsAuthorized(true)
					localStorage.setItem('isAuthed', true)
				} else {
					localStorage.clear()
				}
			})
			.catch(error => {
				console.log(error.message)
				setErrorProperty(true)
				localStorage.clear()
			})
	};

	useEffect(() => {
		if (localStorage.getItem('inn') && localStorage.getItem('password')) {
			navigate('/homepage')
		}
	}, [isAuthorized]);
	// if (localStorage.getItem('inn') && localStorage.getItem('password')) {
	// 	window.location.pathname = '/homepage'
	// }

	const mgTopOfPage: number = window.innerHeight / 5

	return (
		<ThemeProvider theme={defaultTheme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: `${mgTopOfPage}px`,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					{/*<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>*/}
					{/*	<LockOutlinedIcon />*/}
					{/*</Avatar>*/}
					<Styled.Header>Цифровой рубль</Styled.Header>
					<Typography component="h1" variant="h5">
						Зарегистрироваться
					</Typography>
					<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
						{/* inn */}
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="ИНН"
							name="email"
							autoComplete="email"
							type="number"
							error={errorProperty}
							autoFocus
						/>
						{/* username */}
						<TextField
							margin="normal"
							required
							fullWidth
							id="username"
							label="Имя пользователя"
							name="username"
							type="username"
							error={errorProperty}
							inputProps={{
								maxLength: 20,
							}}
							autoFocus
						/>
						{/* password */}
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Пароль"
							type="password"
							id="password"
							error={errorProperty}
							inputProps={{
								maxLength: 15,
							}}
							autoComplete="current-password"
						/>
						{/*<FormControlLabel*/}
						{/*	control={<Checkbox value="remember" color="primary" />}*/}
						{/*	label="Remember me"*/}
						{/*/>*/}
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 2, mb: 2, py: 2 }}
						>
							Зарегистрироваться
						</Button>
						<Grid container>
							{/*	<Grid item xs>*/}
							{/*		<Link href="#" variant="body2">*/}
							{/*			Forgot password?*/}
							{/*		</Link>*/}
							{/*	</Grid>*/}
							<Grid item>
								<Link href='/auth' variant="body2">
									{"Есть аккаунт? Войти"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	)
}


export default RegisterPage