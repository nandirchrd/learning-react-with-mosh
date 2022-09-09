import { Component } from 'react';
import { getMovies } from '../../services/fakeMovieService';
import { MoviesTable } from '../';
import Pagination from '../common/pagination';
import paginate from '../../utils/paginate';
import ListGroup from '../common/listGroup';
import { getGenres } from '../../services/fakeGenreService';
import { sorting } from '../../utils/sorting';

class Movies extends Component {
	state = {
		movies: [],
		currentPage: 1,
		pageSize: 4,
		genres: [],
		selectedGenre: { _id: '', name: 'All genres' },
		sortColumn: { path: 'title', order: 'asc' },
	};
	componentDidUpdate() {
		console.log('COMP - Did update');
	}
	componentWillUnmount() {
		console.log('COMP - WILL UNMOUNT?');
	}
	componentDidMount() {
		console.log('COMP - Did mount');
		const genres = [{ _id: '', name: 'All genres' }, ...getGenres()];
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
		if (!window.confirm('Are u sure?')) return false;
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
	handlePageChange = (page) => {
		const pageCount = Math.ceil(
			this.state.movies.length / this.state.pageSize
		);

		if (page < 1 || page > pageCount) return;
		this.setState({ ...this.state, currentPage: page });
	};
	handleGenreSelect = (genre) => {
		this.setState({
			...this.state,
			sortColumn: { path: 'title', order: 'asc' },
			selectedGenre: genre,
			currentPage: 1,
		});
	};
	handleSort = (sortColumn) => {
		this.setState({ ...this.state, sortColumn });
	};
	getPageMovies = () => {
		const { movies: allMovies, selectedGenre, sortColumn } = this.state;
		// FILTERED MOVIES BY GENRE
		const filtered =
			selectedGenre && selectedGenre._id
				? allMovies.filter(
						(movie) => movie.genre._id === selectedGenre._id
				  )
				: allMovies;
		// SORTED MOVIES
		const sorted = sorting(filtered, sortColumn);
		// PAGINATE THE MOVIES
		const movies = paginate(
			sorted,
			this.state.currentPage,
			this.state.pageSize
		);
		return { data: movies, totalCount: filtered.length };
	};

	render() {
		console.log('COMP - Rendered');
		const { movies: allMovies, sortColumn } = this.state;

		const { data: movies, totalCount } = this.getPageMovies();

		if (!allMovies || allMovies.length <= 0)
			return <p>There is no movies in the database</p>;

		return (
			<div className='row'>
				<div className='col col-lg-3'>
					<ListGroup
						items={this.state.genres}
						onItemSelect={this.handleGenreSelect}
						selectedItem={this.state.selectedGenre}
					/>
				</div>
				<div className='col'>
					<p>
						Showing {totalCount}{' '}
						{totalCount <= 1 ? 'movie' : 'movies'} in the database
					</p>
					<MoviesTable
						movies={movies}
						onLike={this.handleLikedMovie}
						onDelete={this.handleDeleteMovie}
						onSort={this.handleSort}
						sortColumn={sortColumn}
					/>
					<Pagination
						itemsCount={totalCount}
						pageSize={this.state.pageSize}
						currentPage={this.state.currentPage}
						onPageChange={this.handlePageChange}
					/>
				</div>
			</div>
		);
	}
}

export default Movies;
