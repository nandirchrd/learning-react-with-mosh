import Joi from 'joi-browser';
import React from 'react';
import { toast } from 'react-toastify';
import { getGenres } from '../../services/genreService';
import { getMovie, saveMovie } from '../../services/movieService';
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
	componentDidMount = async () => {
		const { data: genres } = await getGenres();
		this.setState({ genres });
		const { id: movieId } = this.props.match.params;
		if (movieId === 'new') return;
		try {
			const { data: movie } = await getMovie(movieId);
			this.setState({ data: this.mapToViewModel(movie) });
		} catch (err) {
			this.props.history.replace('/not-found');
		}
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

	async doSubmit() {
		// Calling the backend

		try {
			await saveMovie(this.state.data);
			if (this.state.data._id.trim() !== '') {
				toast('Update success!');
			} else {
				toast.success('Added success!');
			}

			this.props.history.replace('/movies');
		} catch (err) {
			toast.error(err.response.data);
		}
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
