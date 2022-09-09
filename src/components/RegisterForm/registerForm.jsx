import Joi from 'joi-browser';
import React from 'react';
import Form from '../common/form';

class RegisterForm extends Form {
	state = { data: { email: '', username: '', password: '' }, errors: {} };
	schema = {
		email: Joi.string().email().required(),
		username: Joi.string().min(4).required(),
		password: Joi.string().min(5).required(),
	};
	doSubmit() {
		// Calling the backend
		console.log('Submitted');
	}
	render() {
		return (
			<div className='container'>
				<form className='form' onSubmit={this.handleSubmit}>
					{this.renderInput('username', 'Username')}
					{this.renderInput('email', 'Email', 'email')}
					{this.renderInput('password', 'Password', 'password')}
					{this.renderButton('Register')}
				</form>
			</div>
		);
	}
}

export default RegisterForm;
