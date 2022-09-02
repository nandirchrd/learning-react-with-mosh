import { Component } from 'react';
import { getMovies } from '../../services/fakeMovieService';
import { Movie } from '../';

class Movies extends Component {
	state = {
		movies: null,
	};
	componentDidMount() {
		this.setState({ ...this.state, movies: getMovies() });
	}
	handleDeleteMovie = (targetMovie) => {
		const deletedMovie = this.state.movies.filter(
			(movie) => movie !== targetMovie
		);
		this.setState({ ...this.state, movies: deletedMovie });
		alert(`"${targetMovie.title}" has deleted`);
	};
	showMovies() {
		const { movies } = this.state;

		if (!movies || movies.length <= 0) {
			return <p>There is no movies in the database</p>;
		}
		return (
			<>
				<p>
					Showing {movies.length}{' '}
					{movies.length === 1 ? 'movie' : 'movies'} in the database
				</p>
				<table className='table'>
					<thead>
						<tr>
							<th>Title</th>
							<th>Genre</th>
							<th>Stock</th>
							<th>Rate</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{movies?.map((movie) => (
							<Movie
								key={movie._id}
								movie={movie}
								onDelete={this.handleDeleteMovie}
							/>
						))}
					</tbody>
				</table>
			</>
		);
	}
	render() {
		return this.showMovies();
	}
}

export default Movies;
