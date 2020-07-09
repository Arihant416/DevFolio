import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layouts/alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profileForms/CreateProfile';
import EditProfile from './components/profileForms/editProfile';
import AddExperience from './components/profileForms/AddExperience';
import AddEducation from './components/profileForms/AddEducation';
import PrivateRoute from './components/routing/PrivateRoute';
//Redux Portion
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import './App.css';
if (localStorage.token) {
	setAuthToken(localStorage.token);
}
const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);
	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Navbar />
					<Route exact path='/' component={Landing} />
					<section className='container'>
						<Alert />
						<Switch>
							<Route exact path='/register' component={Register} />
							<Route exact path='/login' component={Login} />
							<PrivateRoute exact path='/dashboard' component={Dashboard} />
							<PrivateRoute
								exact
								path='/create-profile'
								component={CreateProfile}
							/>
							<PrivateRoute
								exact
								path='/edit-profile'
								component={EditProfile}
							/>
							<PrivateRoute
								exact
								path='/add-experience'
								component={AddExperience}
							/>
							<PrivateRoute
								exact
								path='/add-education'
								component={AddEducation}
							/>
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
