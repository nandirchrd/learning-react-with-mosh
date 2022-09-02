import { Component } from 'react';

class Navbar extends Component {
	render() {
		const { counts } = this.props;
		return (
			<nav className='navbar bg-primary'>
				<div className='container nav-brand text-white'>
					<h1>Navbar</h1>
					<span className='badge mx-2 border border-white'>
						{counts}
					</span>
				</div>
			</nav>
		);
	}
}

export default Navbar;
