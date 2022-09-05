import { Component } from 'react';
import propTypes from 'prop-types';

class ListGroup extends Component {
	render() {
		const { items, onItemSelect, selectedItem } = this.props;
		return (
			<ul className='list-group'>
				{items.map((item) => (
					<li
						key={item._id}
						style={{ cursor: 'pointer' }}
						className={
							item._id === selectedItem?._id
								? 'list-group-item active'
								: 'list-group-item'
						}
						onClick={() => onItemSelect(item)}>
						{item.name}
					</li>
				))}
			</ul>
		);
	}
}

ListGroup.propTypes = {
	items: propTypes.array.isRequired,
	onItemSelect: propTypes.func.isRequired,
	selectedItem: propTypes.object,
};
export default ListGroup;
