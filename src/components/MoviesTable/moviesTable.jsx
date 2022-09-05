import React, { Component } from 'react';
import Like from '../common/like';

class MoviesTable extends Component {
	renderIcon(path) {
		if (path !== this.props.sortColumn.path) return null;
		return this.props.sortColumn.order === 'asc' ? (
			<i className='mx-1 fa fa-sort-asc'></i>
		) : (
			<i className='mx-1 fa fa-sort-desc'></i>
		);
	}
	render() {
		const { movies, onLike, onDelete, onSort } = this.props;

		if (movies.length === 0) return null;
		return (
			<table className='table'>
				<thead>
					<tr>
						<th
							onClick={() => onSort('title')}
							style={{ cursor: 'pointer' }}>
							Title
							{this.renderIcon('title')}
						</th>
						<th
							onClick={() => onSort('genre.name')}
							style={{ cursor: 'pointer' }}>
							Genre
							{this.renderIcon('genre.name')}
						</th>
						<th
							onClick={() => onSort('numberInStock')}
							style={{ cursor: 'pointer' }}>
							Stock
							{this.renderIcon('numberInStock')}
						</th>
						<th
							onClick={() => onSort('dailyRentalRate')}
							style={{ cursor: 'pointer' }}>
							Rate
							{this.renderIcon('dailyRentalRate')}
						</th>
						<th colSpan={2}></th>
					</tr>
				</thead>
				<tbody>
					{movies?.map((movie) => (
						<tr key={movie._id}>
							<td>{movie.title}</td>
							<td>{movie.genre.name}</td>
							<td>{movie.numberInStock}</td>
							<td>{movie.dailyRentalRate}</td>
							<td>
								<Like
									onClick={() => onLike(movie)}
									liked={movie.liked}
								/>
							</td>
							<td className='text-center'>
								<button
									className='btn btn-sm btn-danger mx-2'
									onClick={() => onDelete(movie)}>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}

export default MoviesTable;
