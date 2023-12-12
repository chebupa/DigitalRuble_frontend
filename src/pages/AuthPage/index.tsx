//@ts-nocheck
import * as React from 'react';
import {useContext, useEffect, useState} from "react";

import axios from "axios";
import AuthStore from "../../core/store/authStore";
import {baseURL} from "../../core/constants/baseURL";

import { Styled } from './styled'

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";


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

function AuthPage() {
	const navigate = useNavigate()
	const [errorProperty, setErrorProperty] = useState(false);
	const [isAuthorized, setIsAuthorized] = useState(false)

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		localStorage.setItem('inn', data.get('email'))
		localStorage.setItem('password', data.get('password'))

		axios.post(`${baseURL}/auth/login`, {inn: localStorage.getItem('inn'), password: localStorage.getItem('password')})
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
	if (localStorage.getItem('inn') && localStorage.getItem('password')) {
		window.location.pathname = '/homepage'
	}

	const mgTopOfPage: number = window.innerHeight / 4.5

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
						Войти
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
							Войти
						</Button>
						<Grid container>
						{/*	<Grid item xs>*/}
						{/*		<Link href="#" variant="body2">*/}
						{/*			Forgot password?*/}
						{/*		</Link>*/}
						{/*	</Grid>*/}
							<Grid item>
								<Link href="/register" variant="body2">
									{"Нет аккаунта? Зарегистрироваться"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
}


export default AuthPage
