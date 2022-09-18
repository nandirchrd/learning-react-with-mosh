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
import ProtectedRoute from './components/common/protectedRoute';
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
						<Route exact path='/login' component={LoginPage} />
						<Route exact path='/logout' component={LogoutPage} />
						<Route
							exact
							path='/register'
							component={RegisterPage}
						/>
						<ProtectedRoute
							exact
							path='/movies/:id'
							component={FormMoviePage}
						/>
						<Route
							exact
							path='/movies'
							render={(props) => (
								<MoviesPage user={this.state.user} {...props} />
							)}
						/>
						<Route
							exact
							path='/customers'
							component={CustomersPage}
						/>
						<Route exact path='/rentals' component={RentalsPage} />
						<Route path='*' component={NotFound} />
					</Switch>
				</main>
			</>
		);
	}
}

export default App;
