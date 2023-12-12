import './styled.scss'

import QRCreator from "../../components/logic/QRCreator/QRCreator";
import {Link} from "react-router-dom";

import { IoIosArrowBack } from "react-icons/io";


function MoneyReceivePage() {
	return (
		<div className='MoneyReceivePage'>
			<Link to='/homepage'>
				<IoIosArrowBack />
				<p>Назад</p>
			</Link>

			<h1>Покажите QR-код отправителю</h1>
			<QRCreator />
		</div>
	)
}


export default MoneyReceivePage