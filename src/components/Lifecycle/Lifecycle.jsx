import { Component } from 'react';

class Lifecycle extends Component {
	state = {
		name: 'Nandi',
		count: 0,
	};
	getSnapshotBeforeUpdate(prev) {
		console.log('Get snapshot before update!', prev);
		return true;
	}
	componentDidCatch() {
		console.log('Comp did catch');
	}
	componentDidMount() {
		console.log('Comp did mount');
		setTimeout(() => {
			this.setState({ ...this.state, name: 'Green Tea' });
		}, 3000);
	}
	componentDidUpdate() {
		console.log('Comp did update');
	}
	shouldComponentUpdate() {
		console.log('Comp should update?');
		return true;
	}
	componentWillUnmount() {
		console.log('Components will unmount');
	}
	handleChange(e) {
		this.setState({ ...this.state, name: e.target.value });
	}
	render() {
		console.log('Render');
		return (
			<>
				<input
					value={this.state.name}
					onChange={(e) => this.handleChange(e)}></input>
				<h1>Count: {this.state.count}</h1>
			</>
		);
	}
}
export default Lifecycle;
