import React, { Component } from 'react';
import Like from '../common/like';
import Table from '../common/table';

class MoviesTable extends Component {
	columns = [
		{ path: 'title', label: 'Title' },
		{ path: 'genre.name', label: 'Genre' },
		{ path: 'dailyRentalRate', label: 'Rate' },
		{ path: 'numberInStock', label: 'Stock' },
		{
			key: 'like',
			content: (movie) => (
				<Like
					liked={movie.liked}
					onClick={() => this.props.onLike(movie)}
				/>
			),
		},
		{
			key: 'delete',
			content: (movie) => (
				<button
					className='btn btn-sm btn-danger'
					onClick={() => this.props.onDelete(movie)}>
					Delete
				</button>
			),
		},
	];
	render() {
		const { movies, onSort, sortColumn } = this.props;

		if (movies.length === 0) return null;
		return (
			<Table
				data={movies}
				columns={this.columns}
				sortColumn={sortColumn}
				onSort={onSort}
			/>
		);
	}
}

export default MoviesTable;
