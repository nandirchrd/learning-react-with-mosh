import { Component } from 'react';
import { getMovies } from '../../services/fakeMovieService';
import { Movie } from '../';
import Pagination from '../common/pagination';
import paginate from '../../utils/paginate';
import ListGroup from '../common/listGroup';
import { getGenres } from '../../services/fakeGenreService';

class Movies extends Component {
	state = {
		movies: [],
		currentPage: 1,
		pageSize: 4,
		genres: [],
		selectedGenre: null,
	};

	componentDidUpdate() {
		console.log('COMP - Did update');
	}
	componentWillUnmount() {
		console.log('COMP - WILL UNMOUNT?');
	}
	componentDidMount() {
		console.log('COMP - Did mount');
		const genres = [{ name: 'All genres' }, ...getGenres()];
		this.setState({
			...this.state,
			movies: getMovies(),
			genres,
		});
	}
	shouldComponentUpdate() {
		console.log('COMP - Should Update?');
		return true;
	}
	handleDeleteMovie = (targetMovie) => {
		const deletedMovie = this.state.movies.filter(
			(movie) => movie !== targetMovie
		);

		this.setState({ ...this.state, movies: deletedMovie }, () => {
			const pageCount = Math.ceil(
				this.state.movies.length / this.state.pageSize
			);
			if (this.state.currentPage > pageCount) {
				this.setState({
					...this.state,
					currentPage: this.state.currentPage - 1,
				});
			}
		});

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
	handlePage = (page) => {
		const pageCount = Math.ceil(
			this.state.movies.length / this.state.pageSize
		);

		if (page < 1 || page > pageCount) return;
		this.setState({ ...this.state, currentPage: page });
	};
	handleGenreSelect = (genre) => {
		this.setState({ ...this.state, selectedGenre: genre, currentPage: 1 });
	};
	showMovies() {
		const { movies, selectedGenre } = this.state;
		const filtered =
			selectedGenre && selectedGenre._id
				? movies.filter(
						(movie) => movie.genre._id === selectedGenre._id
				  )
				: movies;
		const paginateMovies = paginate(
			filtered,
			this.state.currentPage,
			this.state.pageSize
		);

		if (!movies || movies.length <= 0) {
			return <p>There is no movies in the database</p>;
		}
		return (
			<div className='row'>
				<div className='col-3'>
					<ListGroup
						items={this.state.genres}
						onItemSelect={this.handleGenreSelect}
						selectedItem={this.state.selectedGenre}
					/>
				</div>
				<div className='col'>
					<p>
						Showing {filtered.length}{' '}
						{filtered.length === 1 ? 'movie' : 'movies'} in the
						database
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
							{paginateMovies?.map((movie) => (
								<Movie
									key={movie._id}
									movie={movie}
									onDelete={this.handleDeleteMovie}
									onLiked={this.handleLikedMovie}
								/>
							))}
						</tbody>
					</table>
					<Pagination
						itemsCount={filtered.length}
						pageSize={this.state.pageSize}
						currentPage={this.state.currentPage}
						onPage={this.handlePage}
					/>
				</div>
			</div>
		);
	}

	render() {
		console.log('COMP - Rendered');
		return this.showMovies();
	}
}

export default Movies;
