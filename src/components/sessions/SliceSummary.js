import React from "react";

const SliceSummary = ({ slices }) => {
	return (
		<div className="card z-depth-0 classs-summary">
			<div className="card-content grey-text text-darken-3">
				<p>Slice Id: {slices.id}</p>
				<span className="card-title">{slices.Title}</span>
				<p>Topic: {slices.Topic}</p>

				{slices.Cheese ? <p>Image Slice</p> : slices.Lecture === true ? <p>Lecture Slice</p> : <p>Question Slice</p>}
			</div>
		</div>
	);
};

export default SliceSummary;
