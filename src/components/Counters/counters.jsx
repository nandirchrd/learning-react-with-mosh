import { Component } from 'react';
import Counter from '../Counter/counter';

class Counters extends Component {
	render() {
		const { counters, onIncrement, onDecrement, onDelete } = this.props;
		return (
			<div>
				{counters?.map((counter) => (
					<Counter
						key={counter.id}
						counter={counter}
						onDecrement={onDecrement}
						onIncrement={onIncrement}
						onDelete={onDelete}
					/>
				))}
			</div>
		);
	}
}

export default Counters;
