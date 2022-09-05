import React, { Component } from 'react';
import propTypes from 'prop-types';

class TableHeader extends Component {
	raiseSort(path) {
		const { onSort } = this.props;
		const sortColumn = { ...this.props.sortColumn };
		if (path === sortColumn.path) {
			sortColumn.path = path;
			sortColumn.order =
				this.props.sortColumn.order === 'asc' ? 'desc' : 'asc';
		} else {
			sortColumn.path = path;
			sortColumn.order = 'asc';
		}
		onSort(sortColumn);
	}
	renderIcon(path) {
		if (path !== this.props.sortColumn.path) return null;
		return this.props.sortColumn.order === 'asc' ? (
			<i className='mx-1 fa fa-sort-asc'></i>
		) : (
			<i className='mx-1 fa fa-sort-desc'></i>
		);
	}
	render() {
		const { columns } = this.props;
		return (
			<thead>
				<tr>
					{columns.map((column) => (
						<th
							key={column.path || column.key}
							onClick={() => this.raiseSort(column.path)}
							style={{ cursor: 'pointer' }}>
							{column.label}
							{this.renderIcon(column.path)}
						</th>
					))}
				</tr>
			</thead>
		);
	}
}

TableHeader.propTypes = {
	columns: propTypes.array.isRequired,
	sortColumn: propTypes.object.isRequired,
	onSort: propTypes.func.isRequired,
};

export default TableHeader;
