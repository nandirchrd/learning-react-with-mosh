import React, { Component } from 'react';

class SearchBox extends Component {
	render() {
		const {
			name,
			value,
			placeholder = 'Search something',
			onChange,
		} = this.props;
		return (
			<input
				name={name}
				value={value}
				type='text'
				className='form-control mt-2'
				placeholder={placeholder}
				onChange={(e) => onChange(e.currentTarget.value)}></input>
		);
	}
}

export default SearchBox;
