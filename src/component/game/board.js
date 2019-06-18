import React, { Component } from "react";
import Square from "./square";

export default class Board extends Component {
	onClick = (evt) => {
		const { play, winner } = this.props,
			{ target: { value, textContent: index } } = evt;
		!value && !winner && play(index);
	};
	render() {
		const { width } = this.props;
		const newChildren = React.Children.map(this.props.children, (child, index) => {
			if (child.type) {
				return React.cloneElement(child, {
					color: (Math.floor(index / width) + index % width) / 5 * 255,
					onClick: this.onClick
				});
			} else {
				return child;
			}
		});
		return <div className="board">{newChildren}</div>;
	}
}
