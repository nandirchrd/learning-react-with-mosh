import React from 'react';
import Form from '../common/form';
import Joi from 'joi-browser';
import auth from '../../services/authService';
import { toast } from 'react-toastify';

class LoginForm extends Form {
	state = { data: { username: '', password: '' }, errors: {} };
	schema = {
		username: Joi.string().email().required().min(6),
		password: Joi.string().min(5).required(),
	};

	async doSubmit() {
		// Call the backend
		try {
			const { username, password } = this.state.data;
			await auth.login(username, password);
			toast.success('LOGIN SUCCESS!');
			const { state } = this.props.location;
			window.location = state ? state.from : '/movies';
		} catch (err) {
			if (err.response && err.response.status === 400) {
				toast.error('LOGIN FAILED!');
				const errors = { ...this.state.errors };
				errors.username = err.response.data;

				this.setState({ errors });
			}
		}
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
