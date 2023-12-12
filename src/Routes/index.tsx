import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import RegisterPage from "../pages/RegisterPage";
import MoneyReceivePage from "../pages/MoneyReceivePage";
import MoneySendPage from "../pages/MoneySendPage";
import CommitTransactionPage from "../pages/CommitTransactionPage";
import SuccessTransactionPage from "../pages/SuccessTransactionPage";
import SignOutPage from "../pages/SignOutPage";


export function RoutesComponent() {
	return (
		<Router>
			<Routes>
				<Route index path='/auth' element={ <AuthPage /> } />
				<Route path='/register' element={ <RegisterPage /> } />

				<Route path='/homepage' element={ <HomePage /> } />
				<Route path='/moneyReceivePage' element={ <MoneyReceivePage /> } />
				<Route path='/moneySend' element={ <MoneySendPage /> } />

				<Route path='/commitTransaction' element={ <CommitTransactionPage /> } />
				<Route path='/successTransaction' element={ <SuccessTransactionPage /> } />

				<Route path='/signOut' element={ <SignOutPage /> } />
			</Routes>
		</Router>
	)
}