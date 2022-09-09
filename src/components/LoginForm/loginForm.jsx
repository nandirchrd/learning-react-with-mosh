import React from 'react';
import Form from '../common/form';
import Joi from 'joi-browser';

class LoginForm extends Form {
	state = { data: { username: '', password: '' }, errors: {} };
	schema = {
		username: Joi.string().required().min(6),
		password: Joi.string().min(5).required(),
	};

	doSubmit() {
		// Call the backend
		console.log('SUBMITTED');
	}

	render() {
		return (
			<div className='container'>
				<h1>Login</h1>
				<form className='form' onSubmit={this.handleSubmit}>
					{this.renderInput('username', 'Username')}
					{this.renderInput('password', 'Password', 'password')}
					{this.renderButton('Login')}
				</form>
			</div>
		);
	}
}

export default LoginForm;
