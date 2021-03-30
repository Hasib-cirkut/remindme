import Main from './Pages/Main';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Settings from './Pages/Settings';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact>
					<Login />
				</Route>

				<Route path="/login">
					<Login />
				</Route>

				<Route path="/main">
					<Main />
				</Route>

				<Route path="/settings">
					<Settings />
				</Route>

				<Route path="/register">
					<Register />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
