import React, { Component } from 'react';
import { MovieForm } from '../components';

class FormMoviePage extends Component {
	render() {
		return <MovieForm {...this.props} />;
	}
}

export default FormMoviePage;
