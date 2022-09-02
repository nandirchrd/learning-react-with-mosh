import { Component } from 'react';

class Movie extends Component {
	constructor(props) {
		super();
	}
	handleDelete(movie) {
		const { onDelete } = this.props;

		if (window.confirm('Are u sure?')) {
			onDelete(movie);
		}
	}
	render() {
		const { movie } = this.props;
		return (
			<tr key={movie._id}>
				<td>{movie.title}</td>
				<td>{movie.genre.name}</td>
				<td>{movie.numberInStock}</td>
				<td>{movie.dailyRentalRate}</td>
				<td className='d-flex gap-2'>
					<button
						className='btn btn-sm btn-danger'
						onClick={() => this.handleDelete(movie)}>
						Delete
					</button>
					<button
						className='btn btn-sm btn-success'
						onClick={() => this.handleDelete(movie)}>
						Change
					</button>
				</td>
			</tr>
		);
	}
}

export default Movie;
