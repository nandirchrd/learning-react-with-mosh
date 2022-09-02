import { Component } from 'react';

class Like extends Component {
	getClasses() {
		const { liked } = this.props;
		return liked ? 'text-danger fa fa-heart' : 'text-danger fa fa-heart-o';
	}
	render() {
		return (
			<i
				onClick={() => this.props.onClick()}
				style={{ cursor: 'pointer' }}
				className={this.getClasses()}></i>
		);
	}
}

export default Like;
