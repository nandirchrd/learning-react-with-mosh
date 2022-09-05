import { Component } from 'react';
import range from '../../utils/range';
import propTypes from 'prop-types';

class Pagination extends Component {
	render() {
		const { itemsCount, pageSize, currentPage, onPageChange } = this.props;
		const pageCount = Math.ceil(itemsCount / pageSize);
		const pages = range(pageCount);
		if (pageCount <= 1) return null;
		return (
			<nav>
				<ul className='pagination'>
					<li
						className='page-item'
						style={{ cursor: 'pointer' }}
						onClick={() => onPageChange(currentPage - 1)}>
						<span className='page-link'>&laquo;</span>
					</li>
					{pages.map((page) => (
						<li
							key={page}
							onClick={() => onPageChange(page)}
							className={
								currentPage === page
									? 'page-item active'
									: 'page-item'
							}
							style={{ cursor: 'pointer' }}>
							<span className='page-link'>{page}</span>
						</li>
					))}
					<li
						className='page-item'
						style={{ cursor: 'pointer' }}
						onClick={() => onPageChange(currentPage + 1)}>
						<span className='page-link'>&raquo;</span>
					</li>
				</ul>
			</nav>
		);
	}
}
Pagination.propTypes = {
	itemsCount: propTypes.number.isRequired,
	pageSize: propTypes.number.isRequired,
	currentPage: propTypes.number.isRequired,
	onPageChange: propTypes.func.isRequired,
};

export default Pagination;
