import React, { Component } from "react";
import Square from "./square";

export default class Board extends Component {
	render() {
		const { status, play, winner } = this.props;
		return (
			<div className="board">
				{status.map((value, index) => {
					return <Square {...{ value, play, index, winner }} key={index} />;
				})}
			</div>
		);
	}
}
