import React, { Component } from 'react';

class Input extends Component {
	render() {
		const {
			name,
			label,
			value,
			error,
			onChange,
			type = 'text',
		} = this.props;
		return (
			<div className='form-group'>
				<label htmlFor={name}>{label}</label>
				<input
					onChange={onChange}
					value={value}
					type={type}
					id={name}
					name={name}
					className='form-control'
				/>
				{error && <div className='alert alert-danger'>{error}</div>}
			</div>
		);
	}
}

export default Input;
