import styled from "styled-components";
import { styledButton } from "../../core/styles/styledButton";


export const Styled = {
	Wrapper: styled.div`
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;

      width: 100vw;
      height: 100vh;
	`,
	HomePage: styled.div`
	  display: flex;
	  flex-direction: column;
	  
	  margin: 1rem;
	  
	  transition: all 0.2s ease-in-out;
	`,
	INNText: styled.h1`
	  font-size: 2rem;
	  font-weight: bold;
	`,
	BalanceText: styled.h2``,

	SectionButtons: styled.section`
	  display: flex;
	  flex-direction: column;
	  gap: 1rem;
	  
	  margin-top: 2rem;
	`,
	SendMoneyButton: styled(styledButton)``,
	ReceiveMoneyButton: styled(styledButton)``,
	SignOutButton: styled(styledButton)``,
}