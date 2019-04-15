import React, { Component } from "react";

export default class RoundManger extends Component {
	onChange(evt) {
		const { changeRound } = this.props;
		changeRound(evt.target.value);
	}

	render() {
		const { history, currentRound } = this.props;
		let loopEntity = history.length ? history : new Array(1).fill(0);
		return (
			<select className="roundManager" onChange={this.onChange.bind(this)} value={currentRound}>
				{loopEntity.map((e, index) => {
					return (
						<option value={index + 1} key={index}>
							{index + 1}
						</option>
					);
				})}
			</select>
		);
	}
}
