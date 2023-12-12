import { useState, useEffect, useRef } from "react";
import './styledQRCreator.scss'
import QRCodeStyling from "qr-code-styling";


const qrCode = new QRCodeStyling({
	width: 300,
	height: 300,
	// image:
	// 	"https://i.ibb.co/Sxr2Fw4/qr-icon.png",
	dotsOptions: {
		color: "#000",
		type: "square"
	},
	// imageOptions: {
	// 	crossOrigin: "anonymous",
	// 	margin: 10,
	// 	imageSize:0.5
	// }
});

export function QRCreator() {
	const [url, setUrl] = useState(`${localStorage.getItem('inn')}`);
	const [fileExt, setFileExt] = useState("svg");
	const ref = useRef(null);

	useEffect(() => {
		qrCode.append(ref.current);
	}, []);

	useEffect(() => {
		qrCode.update({
			data: url
		});
	}, [url]);

	// const onUrlChange = (event) => {
	// 	event.preventDefault();
	// 	setUrl(event.target.value);
	// };

	// const onExtensionChange = (event) => {
	// 	setFileExt(event.target.value);
	// };

	return (
		<div className='QRCreator-wrapper'>
			<div className='QRCreator'>
				<div ref={ref} />
			</div>
		</div>
	)
}

const styles = {
	inputWrapper: {
		margin: "20px 0",
		display: "flex",
		justifyContent: "space-between",
		width: "100%"
	},
	inputBox: {
		flexGrow: 1,
		marginRight: 20
	}
};


export default QRCreator