import React from "react";
import SliceSummary from "./SliceSummary";
import { Link } from "react-router-dom";
import { Row, Col, Preloader } from "react-materialize";

const SlicesList = ({ slices, profile }) => {
	if (slices && profile) {
		return (
			<div className="slice-list-children ease-in-anim section">
				{slices &&
					slices.map((slices) => {
						return (
							<Link to={"/slices/" + slices.id} key={slices.id}>
								<SliceSummary slices={slices}></SliceSummary>
							</Link>
						);
					})}
			</div>
		);
	} else {
		return (
			<div className="section">
				<Row>
					<Col s={12} className="centerloader">
						<Preloader flashing size="big" />
					</Col>
				</Row>
			</div>
		);
	}
};

export default SlicesList;
