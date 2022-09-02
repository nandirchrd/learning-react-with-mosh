import './styles/App.css';
import { Counters, Navbar } from './components';
import { Component } from 'react';

class App extends Component {
	state = {
		counters: null,
	};

	componentDidMount() {
		const counters = [
			{ id: 1, value: 0 },
			{ id: 2, value: 2 },
			{ id: 3, value: 5 },
			{ id: 4, value: 1 },
			{ id: 5, value: 3 },
			{ id: 6, value: 0 },
		];
		this.setState({ ...this.state, counters });
	}
	handleDecrement = (target) => {
		if (target.value === 0) {
			return;
		}
		const newCounter = this.state.counters;
		const index = this.state.counters.findIndex(
			(counter) => counter === target
		);
		newCounter[index].value--;
		this.setState({ ...this.state, counters: newCounter });
	};
	handleIncrement = (target) => {
		const newCounter = this.state.counters;
		const index = this.state.counters.findIndex(
			(counter) => counter === target
		);
		newCounter[index].value++;
		this.setState({ ...this.state, counters: newCounter });
	};
	handleDelete = (target) => {
		const filteredCounter = this.state.counters.filter(
			(counter) => counter !== target
		);

		this.setState({ ...this.state, counters: filteredCounter });
	};
	getCounts = () => {
		const counts = this.state.counters?.filter(
			(counter) => counter.value > 0
		);
		return Array.isArray(counts) ? counts.length : 0;
	};
	render() {
		return (
			<>
				<Navbar counts={this.getCounts()} />
				<main className='container'>
					<Counters
						counters={this.state.counters}
						onDecrement={this.handleDecrement}
						onIncrement={this.handleIncrement}
						onDelete={this.handleDelete}
					/>
				</main>
			</>
		);
	}
}

export default App;
