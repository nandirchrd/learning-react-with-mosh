import { Component } from 'react';
import Like from '../common/like';

class Movie extends Component {
	constructor(props) {
		super();
	}
	onDelete(movie) {
		const { onDelete } = this.props;

		if (window.confirm('Are u sure?')) {
			onDelete(movie);
		}
	}
	onLiked(movie) {
		const { onLiked } = this.props;
		onLiked(movie);
	}
	render() {
		const { movie } = this.props;
		return (
			<tr key={movie._id}>
				<td>{movie.title}</td>
				<td>{movie.genre.name}</td>
				<td>{movie.numberInStock}</td>
				<td>{movie.dailyRentalRate}</td>
				<td>
					<Like
						onClick={() => this.onLiked(movie)}
						liked={movie.liked}
					/>
				</td>
				<td className='text-center'>
					<button
						className='btn btn-sm btn-danger mx-2'
						onClick={() => this.onDelete(movie)}>
						Delete
					</button>
				</td>
			</tr>
		);
	}
}

export default Movie;
