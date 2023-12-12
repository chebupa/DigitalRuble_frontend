import {useEffect, useState} from "react";
import axios from "axios";

// import { Styled } from "./styledQRScanner";
import './styledQRScanner.scss'

import { Html5Qrcode } from "html5-qrcode";
import {useNavigate} from "react-router-dom";
import {baseURL} from "../../../core/constants/baseURL";


export function QRScanner() {
	const navigate = useNavigate()
	const [isEnabled, setEnabled] = useState(true)
	const [qrMessage, setQrMessage] = useState('')

	useEffect(() => {
		const config = {fps: 10, qrbox: {width: 200, height: 200}}
		const html5QrCode = new Html5Qrcode('qrCodeContainer')

		const qrScannerStop = () => {
			if (html5QrCode && html5QrCode.isScanning) {
				html5QrCode.stop()
					.then(() => console.log('scanner stop'))
					.catch(() => console.log('scanner error'))
			}
		}

		const qrCodeSuccess = (decodedText) => {
			setQrMessage(decodedText)
			setEnabled(false)
		}

		if (isEnabled) {
			html5QrCode.start({facingMode: 'environment'}, config, qrCodeSuccess)
			setEnabled(true)
			setQrMessage('')
		} else {
			qrScannerStop()
		}

		return (() => {
			qrScannerStop()
		})

	}, [isEnabled])
	useEffect(() => {
		if (qrMessage !== '') {
			axios.post(`${baseURL}/user/exists`, {inn: Number(qrMessage)})
				.then(response => {
					if (response.data.authorized) {
						localStorage.setItem('recipient', qrMessage)
						navigate('/commitTransaction')
					}
				})
				.catch(e => {
					console.log(e.message)
					setQrMessage('')
				})
		}
	}, [qrMessage])

	return (
		<div className='scanner'>
			<div id='qrCodeContainer'></div>
			{/*{qrMessage && <div className='qr-message'>{qrMessage}</div>}*/}
			{/*<button className='start-button' onClick={() => props.btnActive = true}></button>*/}
			{/*<button className='start-button' onClick={() => setEnabled(!isEnabled)}><FiSend color='white' size='2rem' />Отправить деньги</button>*/}
			{/*<Styled.QrOnButton onClick={() => setEnabled(!isEnabled)}><FiSend color='white' size='2rem' />Отправить деньги</Styled.QrOnButton>*/}
		</div>
	)
}