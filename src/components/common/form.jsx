import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';

class Form extends Component {
	state = { data: {}, errors: {} };
	validate() {
		const options = { abortEarly: false };
		const { error } = Joi.validate(this.state.data, this.schema, options);
		if (!error) return null;
		const errors = {};
		console.log(error);
		for (let i = error.details.length - 1; i >= 0; --i) {
			errors[error.details[i].path[0]] = error.details[i].message;
		}
		return errors;
	}
	validateProperty(input) {
		const obj = { [input.name]: input.value };
		const schema = { [input.name]: this.schema[input.name] };
		const { error } = Joi.validate(obj, schema);
		return error ? error.details[0].message : null;
	}
	handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors };
		const error = this.validateProperty(input);
		if (error) errors[input.name] = error;
		else delete errors[input.name];

		const data = { ...this.state.data };
		data[input.name] = input.value;
		this.setState({ ...this.state, data, errors });
	};
	handleSubmit = (e) => {
		e.preventDefault();
		const errors = this.validate();
		this.setState({ ...this.state, errors: errors || {} });
		// Call the backend
		this.doSubmit();
	};

	renderInput(name, label, type = 'text') {
		// name, label, value, error, onChange
		return (
			<Input
				name={name}
				label={label}
				type={type}
				value={this.state.data[name]}
				onChange={this.handleChange}
				error={this.state.errors[name]}
			/>
		);
	}
	renderSelect(name, label, items) {
		return (
			<div className='form-group'>
				<label htmlFor={name}>{label}</label>
				<select
					id={name}
					name={name}
					value={this.state.data[name]}
					onChange={this.handleChange}
					className='form-select'>
					<option className='select-item' disabled>
						{''}
					</option>
					{items.map((item) => (
						<option
							key={item._id}
							className='select-item'
							value={item._id}>
							{item.name}
						</option>
					))}
				</select>
				{this.state.errors[name] && (
					<div className='alert alert-danger'>
						{this.state.errors[name]}
					</div>
				)}
			</div>
		);
	}
	renderButton(label) {
		return (
			<button
				disabled={this.validate()}
				type='submit'
				className='mt-2 btn btn-primary'>
				{label}
			</button>
		);
	}
}

export default Form;
