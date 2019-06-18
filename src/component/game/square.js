import React from "react";

const Square = React.memo((props, context = {}) => {
	const { value, color, onClick } = props;
	return (
		<React.Fragment>
			<style jsx>
				{`
					button {
						background-color: rgb(170, 85, ${color});
					}
				`}
			</style>
			<button className="square" onClick={onClick} value={value}>
				{props.children}
			</button>
		</React.Fragment>
	);
	// }
});

export default Square;
