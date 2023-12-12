import './styled.scss'

import {Link} from "react-router-dom";


function SuccessTransactionPage() {
	return (
		<div className='SuccessTransactionPage'>
			<h1>Перевод прошёл успешно</h1>
			<Link to='/homepage'>Вернуться на главную</Link>
		</div>
	)
}


export default SuccessTransactionPage