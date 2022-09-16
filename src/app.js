import { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MoviesPage from './pages/moviesPage';
import { Navbar } from './components';
import CustomersPage from './pages/customersPage';
import RentalsPage from './pages/rentalsPage';
import NotFound from './pages/notFound';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import FormMoviePage from './pages/formMoviePage';
import { ToastContainer } from 'react-toastify';
import LogoutPage from './pages/logoutPage';
import auth from './services/authService';
class App extends Component {
	state = {};

	componentDidMount() {
		try {
			const user = auth.getCurrentUser();

			this.setState({ user });
		} catch (err) {
			console.log(err);
		}
	}
	render() {
		return (
			<>
				<ToastContainer />
				<Navbar user={this.state.user} />
				<main className='container'>
					<Switch>
						<Route path='/login' component={LoginPage} />
						<Route path='/logout' component={LogoutPage} />
						<Route path='/register' component={RegisterPage} />
						<Route
							path='/movies/:id'
							render={(props) =>
								!this.state.user ? (
									<Redirect to='/login' />
								) : (
									<FormMoviePage {...props} />
								)
							}
						/>
						<Route
							path='/movies'
							render={(props) => (
								<MoviesPage user={this.state.user} {...props} />
							)}
						/>
						<Route path='/customers' component={CustomersPage} />
						<Route path='/rentals' component={RentalsPage} />
						<NotFound />
					</Switch>
				</main>
			</>
		);
	}
}

export default App;
