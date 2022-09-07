import React, { Component } from 'react';
import {} from 'react-router-dom';

class FormMoviePage extends Component {
	render() {
		const { id: idMovie } = this.props.match.params;
		const history = this.props.history;
		console.log(idMovie);
		return (
			<div>
				<h1>Movie Form {idMovie}</h1>
				<button
					className='btn btn-primary'
					onClick={() => {
						alert('SAVED');
						history.push('/movies');
					}}>
					Save
				</button>
			</div>
		);
	}
}

export default FormMoviePage;
