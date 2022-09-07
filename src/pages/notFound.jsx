import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class NotFound extends Component {
	state = { count: 5 };
	componentDidMount() {
		this.intervalCount = setInterval(() => {
			this.setState({ ...this.state, count: this.state.count - 1 });
			console.log('Der');
		}, 1000);
	}
	componentWillUnmount() {
		console.log('INTERVAL CLEARED!');
		clearInterval(this.intervalCount);
	}
	render() {
		if (this.state.count < 0) return <Redirect to='/movies' />;
		return (
			<div className='text-center'>
				<h1 className='text-danger'>404 Page Not Found!</h1>
				<p>Redirect automatically in {this.state.count}</p>
			</div>
		);
	}
}

export default NotFound;
