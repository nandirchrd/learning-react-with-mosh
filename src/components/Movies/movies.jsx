import { Component } from 'react';
import { MoviesTable } from '../';
import Pagination from '../common/pagination';
import paginate from '../../utils/paginate';
import ListGroup from '../common/listGroup';
import { sorting } from '../../utils/sorting';
import { Link } from 'react-router-dom';
import SearchBox from '../common/searchBox';
import { getGenres } from '../../services/genreService';
import { getMovies, deleteMovie } from '../../services/movieService';
import { toast } from 'react-toastify';

class Movies extends Component {
	state = {
		movies: [],
		currentPage: 1,
		pageSize: 4,
		genres: [],
		query: '',
		selectedGenre: { _id: '', name: 'All genres' },
		sortColumn: { path: 'title', order: 'asc' },
	};
	componentDidUpdate() {
		console.log('COMP - Did update');
	}
	componentWillUnmount() {
		console.log('COMP - WILL UNMOUNT?');
	}
	async componentDidMount() {
		console.log('COMP - Did mount');
		const { data } = await getGenres();
		const genres = [{ _id: '', name: 'All genres' }, ...data];

		const { data: movies } = await getMovies();
		this.setState({ movies, genres });
		console.log(this.props);
	}
	shouldComponentUpdate() {
		console.log('COMP - Should Update?');
		return true;
	}
	handleDeleteMovie = async (targetMovie) => {
		if (!window.confirm('Are u sure?')) return false;
		const originalMovies = [...this.state.movies];
		const movies = originalMovies.filter((movie) => movie !== targetMovie);

		this.setState({ movies }, () => {
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
		try {
			await deleteMovie(targetMovie);
			toast.error(`"${targetMovie.title}" has deleted`);
		} catch (err) {
			toast.error('ERROR');
			this.setState({ movies: originalMovies });
		}
	};
	handleLikedMovie = async (targetMovie) => {
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
			query: '',
		});
	};
	handleSort = (sortColumn) => {
		this.setState({ ...this.state, sortColumn });
	};
	handleSearch = (query) =>
		this.setState({
			query,
			selectedGenre: { _id: '', name: 'All Genres' },
			currentPage: 1,
		});
	getPageMovies = () => {
		const {
			movies: allMovies,
			selectedGenre,
			sortColumn,
			query,
		} = this.state;
		// FILTERED MOVIES BY GENRE OR SEARCH BY QUERY
		let filtered = allMovies;
		if (query) {
			filtered = allMovies.filter((movie) =>
				movie.title.toLowerCase().startsWith(query)
			);
		} else if (selectedGenre && selectedGenre._id) {
			filtered = allMovies.filter(
				(movie) => movie.genre._id === selectedGenre._id
			);
		}

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
					{this.props.user && (
						<Link className='btn btn-primary' to='movies/new'>
							Add movie
						</Link>
					)}
					<SearchBox
						name='query'
						value={this.state.query}
						onChange={this.handleSearch}
					/>
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
