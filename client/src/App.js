import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
//Redux Portion
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

const App = () => (
	<Provider store={store}>
		<Router>
			<Fragment>
				<Navbar />
				<Switch>
					<Route exact path='/' component={Landing} />
					<section className='container'>
						<Route exact path='/register' component={Register} />
						<Route exact path='/login' component={Login} />
					</section>
				</Switch>
			</Fragment>
		</Router>
	</Provider>
);

export default App;
