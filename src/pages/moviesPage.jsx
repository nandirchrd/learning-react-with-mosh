import React, { Component } from 'react';
import { Movies as MoviesComponent } from '../components';

class MoviesPage extends Component {
	render() {
		return <MoviesComponent {...this.props} />;
	}
}

export default MoviesPage;
