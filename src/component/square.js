import React, { Component } from "react";

export default class Square extends Component {
	onClick() {
		const { index, value, play, winner } = this.props;
		!value && !winner && play(index);
	}

	render() {
		const { value, index } = this.props;
		return (
			<button className="square" onClick={this.onClick.bind(this)}>
				{value || index}
			</button>
		);
	}
}
