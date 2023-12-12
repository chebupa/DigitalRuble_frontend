import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {baseURL} from "../../core/constants/baseURL";

import { Styled } from "./styled";
import './styled.scss'
import { SendMoneyBtn } from "../../components/UI/SendMoneyBtn";

// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
import { QRScanner } from "../../components/logic/QRScanner/QRScanner";

import { FiSend } from "react-icons/fi";
import { IoQrCodeOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import {StyledBtn} from "../../components/UI/SendMoneyBtn/styled";


function HomePage() {
	const [qrActive, setQrActive] = useState(false)
	const [balance, setBalance] = useState(0)

	axios.post(`${baseURL}/balance`, {inn: localStorage.getItem('inn'), password: localStorage.getItem('password')})
		.then(response => console.log(setBalance(response.data.balance)))

	if (localStorage.getItem('inn') && localStorage.getItem('password') && localStorage.getItem('isAuthed')) {
		return (
			<Styled.Wrapper>
				<Styled.HomePage>
					{/* inn, balance info */}
					<Styled.INNText>ИНН: {localStorage.getItem('inn')}</Styled.INNText>
					<Styled.BalanceText>Баланс: {balance} ₽</Styled.BalanceText>

					{/* buttons section */}
					<Styled.SectionButtons>
						<Link to='/moneySend'>
							<Styled.SendMoneyButton><FiSend color='white' size='2rem' />Отправить деньги</Styled.SendMoneyButton>
						</Link>

						<Link to='/moneyReceivePage'>
							<Styled.ReceiveMoneyButton><IoQrCodeOutline color='white' size='2rem' />Получить деньги</Styled.ReceiveMoneyButton>
						</Link>

						<Link to='/signOut'>
							<Styled.SignOutButton><CiLogout />Выйти</Styled.SignOutButton>
						</Link>
					</Styled.SectionButtons>
				</Styled.HomePage>
			</Styled.Wrapper>
		)
	} else {
		// TODO: change to useNavigate
		window.location.pathname = '/auth'
		localStorage.removeItem('inn')
		localStorage.removeItem('password')
		return (<></>)
	}
}


export default HomePage