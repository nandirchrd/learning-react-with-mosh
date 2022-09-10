import React, { Component } from 'react';

class Select extends Component {
	render() {
		const { name, label, value, error, items, onChange } = this.props;
		console.log(items);
		return (
			<div className='form-group'>
				<label htmlFor={name}>{label}</label>
				<select
					id={name}
					name={name}
					value={value}
					onChange={onChange}
					className='form-select'>
					<option className='select-item' value={''} disabled>
						{label}
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
				{error && <div className='alert alert-danger'>{error}</div>}
			</div>
		);
	}
}

export default Select;
