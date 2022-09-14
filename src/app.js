import { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import MoviesPage from './pages/moviesPage';
import { Navbar } from './components';
import CustomersPage from './pages/customersPage';
import RentalsPage from './pages/rentalsPage';
import NotFound from './pages/notFound';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import FormMoviePage from './pages/formMoviePage';
import { ToastContainer } from 'react-toastify';

class App extends Component {
	render() {
		return (
			<>
				<ToastContainer />
				<Navbar />
				<main className='container'>
					<Switch>
						<Route path='/login' component={LoginPage} />
						<Route path='/register' component={RegisterPage} />
						<Route path='/movies/:id' component={FormMoviePage} />
						<Route path='/movies' component={MoviesPage} />
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
