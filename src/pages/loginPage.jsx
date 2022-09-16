import React, { Component } from 'react';
import { LoginForm } from '../components';

class LoginPage extends Component {
	state = {};
	render() {
		return <LoginForm {...this.props} />;
	}
}

export default LoginPage;
