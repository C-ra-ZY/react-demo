import React, { Component } from "react";

export default class Item extends Component {
	render() {
		let { index, children, color, width } = this.props;
		return (
			<React.Fragment>
				<style jsx>{`
					.item {
						height: 100%;
						flex: 1;
					}
				`}</style>
				<div className="item">{children.value}</div>
			</React.Fragment>
		);
	}
}
