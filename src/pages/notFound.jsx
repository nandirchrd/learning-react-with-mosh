import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class NotFound extends Component {
	// state = { count: 5 };
	// componentDidMount() {
	// 	this.intervalCount = setInterval(() => {
	// 		this.setState({ ...this.state, count: this.state.count - 1 });
	// 		console.log('Der');
	// 	}, 1000);
	// }
	// componentWillUnmount() {
	// 	console.log('INTERVAL CLEARED!');
	// 	clearInterval(this.intervalCount);
	// }
	render() {
		return <Redirect to='/movies' />;
	}
}

export default NotFound;
