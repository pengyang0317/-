import React from 'react';
import { Route } from 'react-router-dom';
import LogInRegister from './LogInRegister/login';
import ChangePassword from './LogInRegister/ChangePassword';
import './App.scss';
import Header from './Header';

function App() {
	return (
		<div className="App">
			<div>
				<Header />
				<div>
					<Route path="/login" component={LogInRegister} />
					<Route path="/register" component={LogInRegister} />
					<Route path="/changepassword" component={ChangePassword} />
				</div>
			</div>
		</div>
	);
}

export default App;
