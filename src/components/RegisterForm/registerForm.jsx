import Joi from 'joi-browser';
import React from 'react';
import { toast } from 'react-toastify';
import auth from '../../services/authService';
import { register } from '../../services/userService';
import Form from '../common/form';

class RegisterForm extends Form {
	state = { data: { username: '', name: '', password: '' }, errors: {} };
	schema = {
		username: Joi.string().email().required(),
		name: Joi.string().min(4).required(),
		password: Joi.string().min(5).required(),
	};
	async doSubmit() {
		// Calling the backend
		try {
			const res = await register(this.state.data);
			auth.loginWithJwt(res.headers['x-auth-token']);
			toast.success('REGISTER SUCCESS!');
			window.location = '/movies';
		} catch (err) {
			if (err.response && err.response.data) {
				toast.error('REGISTER FAILED!');
				const errors = { ...this.state.errors };
				errors.username = err.response.data;
				this.setState({ errors });
			}
		}
	}
	render() {
		return (
			<div className='container'>
				<form className='form' onSubmit={this.handleSubmit}>
					{this.renderInput('username', 'Username')}
					{this.renderInput('password', 'Password', 'password')}
					{this.renderInput('name', 'Name')}
					{this.renderButton('Register')}
				</form>
			</div>
		);
	}
}

export default RegisterForm;
