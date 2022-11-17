import { useEffect, useState } from 'react'
import { connect, ConnectedProps, Provider } from 'react-redux'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Landing from './layout/Landing'
import Login from './layout/Login'
import store from './store'
import Register from './layout/Register'
import ProtectedRoutes from './utils/ProtectedRoutes'
import Dashboard from './layout/Dashboard/Dashboard';
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './actions/user'
import State from './types/State'
import { ThunkDispatch } from 'redux-thunk'
import Recipe from './layout/Recipe/Recipe'
import Confirm from './components/Confirm'
import Toasts from './components/Toast'
import { ToastContainer } from 'react-bootstrap'
import Ingredient from './components/Ingredient'
import Account from './layout/Account/Account'
import Email from './layout/Account/actions/Email'
import Actions from './layout/Account/actions/Actions'
import Password from './layout/Account/actions/Password'

if (localStorage.token) setAuthToken(localStorage.token);

const mapStateToProps = (state: State) => ({
	ingredientId: state.modal.ingredient.id,
	confirmShow: state.modal.confirm.show,
});

const connector = connect(mapStateToProps, {loadUser});

type Props = ConnectedProps<typeof connector>;

const App: React.FC<Props> = ({loadUser, ingredientId, confirmShow}) => {
	// load the user once per render
	useEffect(() => {
		loadUser();
	}, [])
	return (
		<BrowserRouter>
			<div className='Flex vertical'>
				<Navbar />
				<div aria-atomic='true' aria-live='polite' className='relative'>
					{confirmShow && <Confirm />}
					{(ingredientId !== '') && <Ingredient />}
					<Routes>
						<Route element={<ProtectedRoutes Protected={false}/>}>
							<Route path='/' element={<Landing />}/>
							<Route path='/login' element={<Login />}/>
							<Route path='/register' element={<Register />}/>
							<Route path='/actions/password/:token' element={<Password />}/>
						</Route>
						<Route element={<ProtectedRoutes Protected={true}/>}>
							<Route path='/dashboard' element={<Dashboard />}/>
							<Route path='/recipe/:id' element={<Recipe />}/>
							<Route path='/account' element={<Account />}/>
							<Route path='/actions' element={<Actions />}/>
							<Route path='/actions/email/:token' element={<Email />}/>
						</Route>
					</Routes>
					<ToastContainer className='p-3 index-2' position='top-end'>
						<Toasts />
					</ToastContainer>
				</div>
				<Footer />	
			</div>
		</BrowserRouter>
	)
}


export default connector(App);
