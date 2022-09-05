import React, { Component } from 'react';
import propTypes from 'prop-types';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

class Table extends Component {
	render() {
		const { data, columns, sortColumn, onSort } = this.props;
		return (
			<table className='table'>
				<TableHeader
					columns={columns}
					sortColumn={sortColumn}
					onSort={onSort}
				/>
				<TableBody data={data} columns={columns} />
			</table>
		);
	}
}

Table.propTypes = {
	data: propTypes.array.isRequired,
	columns: propTypes.array.isRequired,
	sortColumn: propTypes.object.isRequired,
	onSort: propTypes.func.isRequired,
};

export default Table;
