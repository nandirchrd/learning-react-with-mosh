import React, { Component } from 'react';
import propTypes from 'prop-types';
class TableBody extends Component {
	getLabel(data, path) {
		const e = path.split('.').map((d) => [d]);
		switch (e.length) {
			case 1:
				return data[e[0]];
			case 2:
				return data[e[0]][e[1]];
			case 3:
				return data[e[0]][e[1]][e[2]];
			case 4:
				return data[e[0]][e[1]][e[2]][e[3]];
			default:
				break;
		}
	}
	render() {
		const { data, columns } = this.props;

		return (
			<tbody>
				{data?.map((item) => (
					<tr key={item._id}>
						{columns.map((column) => (
							<td key={item._id + (column.path || column.key)}>
								{column.content
									? column.content(item)
									: this.getLabel(item, column.path)}
							</td>
						))}
					</tr>
				))}
			</tbody>
		);
	}
}

TableBody.propTypes = {
	data: propTypes.array.isRequired,
	columns: propTypes.array.isRequired,
};
export default TableBody;
