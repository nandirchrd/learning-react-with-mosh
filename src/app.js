import { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import MoviesPage from './pages/moviesPage';
import { Navbar } from './components';
import CustomersPage from './pages/customersPage';
import RentalsPage from './pages/rentalsPage';
import NotFound from './pages/notFound';
import FormMoviePage from './pages/formMoviePage';
import LoginPage from './pages/loginPage';

class App extends Component {
	render() {
		return (
			<>
				<Navbar />
				<main className='container'>
					<Switch>
						<Route path='/login' component={LoginPage} />
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
