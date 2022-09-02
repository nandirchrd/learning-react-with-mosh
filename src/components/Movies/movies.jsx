import { Component } from 'react';
import { getMovies } from '../../services/fakeMovieService';
import { Movie } from '../';

class Movies extends Component {
	state = {
		movies: null,
	};

	componentDidUpdate() {
		console.log('COMP - Did update');
	}
	componentWillUnmount() {
		console.log('COMP - WILL UNMOUNT?');
	}
	componentDidMount() {
		console.log('COMP - Did mount');
		this.setState({ ...this.state, movies: getMovies() });
	}
	shouldComponentUpdate() {
		console.log('COMP - Should Update?');
		return true;
	}
	handleDeleteMovie = (targetMovie) => {
		const deletedMovie = this.state.movies.filter(
			(movie) => movie !== targetMovie
		);
		this.setState({ ...this.state, movies: deletedMovie });
		alert(`"${targetMovie.title}" has deleted`);
	};
	handleLikedMovie = (targetMovie) => {
		const newMovies = [...this.state.movies];
		const index = this.state.movies.findIndex(
			(movie) => movie === targetMovie
		);
		newMovies[index].liked = !newMovies[index].liked;
		this.setState({ ...this.state, movies: newMovies });
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
							<th colSpan={2}></th>
						</tr>
					</thead>
					<tbody>
						{movies?.map((movie) => (
							<Movie
								key={movie._id}
								movie={movie}
								onDelete={this.handleDeleteMovie}
								onLiked={this.handleLikedMovie}
							/>
						))}
					</tbody>
				</table>
			</>
		);
	}

	render() {
		console.log('COMP - Rendered');
		return this.showMovies();
	}
}

export default Movies;
