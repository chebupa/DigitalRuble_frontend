//@ts-nocheck
import * as React from "react";
import './styled.scss'

import axios from "axios";
import {baseURL} from "../../core/constants/baseURL";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {IoIosArrowBack} from "react-icons/io";


function CommitTransactionPage() {
	const navigate = useNavigate()
	const [errorProperty, setErrorProperty] = useState(false);

	if (localStorage.getItem('recipient')) {
		const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			const data = new FormData(event.currentTarget);

			const amountTotal = Number(data.get('amount'))
			if (amountTotal <= 0) {
				console.log('the amount = 0')
				setErrorProperty(true)
			} else {
				localStorage.setItem('amount', amountTotal)
				setErrorProperty(false)

				axios.post(`${baseURL}/transaction/create`, {
					sender_inn: localStorage.getItem('inn'),
					sender_password: localStorage.getItem('password'),
					recipient_inn: localStorage.getItem('recipient'),
					amount: localStorage.getItem('amount')
				}).then(response => {
					console.log(response)
					if (response.data.created) {
						localStorage.removeItem('recipient')
						localStorage.removeItem('amount')
						navigate('/successTransaction')
					}
				}).catch(error => {
					console.log(error.message)
					setErrorProperty(true)
					localStorage.removeItem('amount')
				})
			}
		};


		return (
			<div className='CommitTransactionPage'>
				<Link className='backLink' to='/homepage'>
					<IoIosArrowBack />
					<p>Назад</p>
				</Link>

				<p>Получатель: {localStorage.getItem('recipient')}</p>

				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="amount"
						label="Введите сумму"
						name="amount"
						type="number"
						error={errorProperty}
						autoFocus
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 2, mb: 2, py: 2 }}
					>
						Отправить
					</Button>
				</Box>
			</div>
		)
	} else {
		// TODO: useNavigate instead
		// useEffect(() => {
		// 	navigate('/homepage')
		// })
		window.location.pathname = '/homepage'
		return (<></>)
	}
}


export default CommitTransactionPage