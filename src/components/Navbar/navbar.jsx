import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class Navbar extends Component {
	render() {
		return (
			<nav className='navbar navbar-fixed-top navbar-expand navbar-dark bg-primary'>
				<div className='container-fluid'>
					<Link to='/' className='navbar-brand'>
						Vidly App
					</Link>
					<div
						className='collapse navbar-collapse d-flex justify-content-end'
						id='navbarNavDropdown'>
						<ul className='navbar-nav'>
							<li className='nav-item'>
								<NavLink className='nav-link' to='/movies'>
									Movies
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink className='nav-link' to='/customers'>
									Customers
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink className='nav-link' to='/rentals'>
									Rentals
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink className='nav-link' to='/login'>
									Login
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink className='nav-link' to='/register'>
									Register
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

export default Navbar;
