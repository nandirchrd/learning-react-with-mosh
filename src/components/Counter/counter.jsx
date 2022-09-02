import { Component } from 'react';

class Counter extends Component {
	onDecrement(target) {
		this.props.onDecrement(target);
	}
	onIncrement(target) {
		this.props.onIncrement(target);
	}
	onDelete(target) {
		this.props.onDelete(target);
	}
	getValue() {
		const { counter } = this.props;
		return counter.value === 0 ? 'ZERO' : counter.value;
	}
	getBadgeClasses() {
		const { counter } = this.props;
		return counter.value === 0
			? 'badge bg-warning text-dark'
			: 'badge bg-primary';
	}
	render() {
		const { counter } = this.props;
		return (
			<div className='container py-2'>
				<span className={this.getBadgeClasses()}>
					{this.getValue()}
				</span>
				<button
					onClick={() => this.onIncrement(counter)}
					className='mx-1 btn btn-sm btn-secondary'>
					+
				</button>
				<button
					onClick={() => this.onDecrement(counter)}
					className='mx-1 btn btn-sm btn-secondary'>
					-
				</button>
				<button
					onClick={() => this.onDelete(counter)}
					className='mx-1 btn btn-sm btn-danger'>
					x
				</button>
			</div>
		);
	}
}

export default Counter;
