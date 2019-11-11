import React from "react";
import { Link } from "react-router-dom";

const SliceSummary = ({ slice }) => {
	return (
		<div className="card z-depth-0 classs-summary">
			<div className="card-content black-text ">
				<p>
					<b>Slice ID:</b> {slice.id}
				</p>
				<Link to={"/slices/" + slice.id} key={slice.id} style={{ color: "#424242" }}>
					<span className="card-title">{slice.Title}</span>
					<p>Topic: {slice.Topic}</p>

					{slice.Cheese ? <p>Image Slice</p> : slice.Lecture === true ? <p>Lecture Slice</p> : <p>Question Slice</p>}
				</Link>
			</div>
		</div>
	);
};

export default SliceSummary;
