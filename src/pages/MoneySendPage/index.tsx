import './styled.scss'

import { QRScanner } from "../../components/logic/QRScanner/QRScanner";
import {IoIosArrowBack} from "react-icons/io";
import {Link} from "react-router-dom";


function MoneySendPage() {
	return (
		<div className='MoneySendPage'>
			<Link className='backLink' to='/homepage'>
				<IoIosArrowBack />
				<p>Назад</p>
			</Link>

			<QRScanner />
		</div>
	)
}


export default MoneySendPage