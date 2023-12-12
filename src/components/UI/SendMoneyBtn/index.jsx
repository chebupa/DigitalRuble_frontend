import { StyledBtn } from "./styled";

// const PillButton = ({ children, onClick }) => {
// 	return (
// 		<StyledButton
// 			whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
// 	whileHover={{ scale: 0.95, transition: { duration: 0.1 } }}
// 	onClick={onClick}
// 		>
// 		{children}
// 		</StyledButton>
// );
// };
export const SendMoneyBtn = ({children, onClick}) => {
	return (
		<StyledBtn
			onClick={onClick}
		>
			{children}
		</StyledBtn>
	)
}