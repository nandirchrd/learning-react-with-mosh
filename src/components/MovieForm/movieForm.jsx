import Joi from 'joi-browser';
import React from 'react';
import { getGenres } from '../../services/fakeGenreService';
import { getMovie, saveMovie } from '../../services/fakeMovieService';
import Form from '../common/form';

class MovieForm extends Form {
	state = {
		data: {
			_id: ' ',
			title: '',
			genreId: '',
			numberInStock: '',
			dailyRentalRate: '',
		},
		genres: [],
		errors: {},
	};
	componentDidMount = () => {
		const genres = getGenres();
		this.setState({ genres });
		const { id: movieId } = this.props.match.params;
		if (movieId === 'new') return;
		const movie = getMovie(movieId);
		console.log(movie);
		if (!movie) return this.props.history.replace('/not-found');
		this.setState({ data: this.mapToViewModel(movie) });
	};
	schema = {
		_id: Joi.string(),
		title: Joi.string().required(),
		genreId: Joi.string().required(),
		numberInStock: Joi.number().min(0).max(100).required(),
		dailyRentalRate: Joi.number().min(0).max(10).required(),
	};
	mapToViewModel(movie) {
		return {
			_id: movie._id,
			title: movie.title,
			genreId: movie.genre._id,
			numberInStock: movie.numberInStock,
			dailyRentalRate: movie.dailyRentalRate,
		};
	}

	doSubmit() {
		// Calling the backend
		const { query } = saveMovie(this.state.data);
		query === 'update'
			? alert('Updated the movie succesfully')
			: alert('Added new movie succesfully');
		this.props.history.replace('/movies');
	}
	render() {
		const { id } = this.props.match.params;
		return (
			<div className='container'>
				<form className='form' onSubmit={this.handleSubmit}>
					{this.renderInput('title', 'Title')}
					{this.renderSelect('genreId', 'Genre', this.state.genres)}
					{this.renderInput('numberInStock', 'Stock')}
					{this.renderInput('dailyRentalRate', 'Rate')}
					{this.renderButton(
						id === 'new' ? 'Add movie' : 'Update movie'
					)}
				</form>
			</div>
		);
	}
}

export default MovieForm;
