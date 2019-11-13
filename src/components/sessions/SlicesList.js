import React from "react";
import SliceSummary from "./SliceSummary";
import { Row, Col, Preloader } from "react-materialize";

const SlicesList = ({ slices, profile, imageFilter, topicFilter, difficultyFilter, userFilter }) => {
	if (slices && profile) {
		let filtered = slices;

		if (imageFilter) {
			filtered = filtered.filter((slice) => {
				return slice.Cheese === true;
			});
		}

		if (userFilter) {
			filtered = filtered.filter((slice) => {
				return slice.createdBy === userFilter;
			});
		}

		if (topicFilter !== "") {
			filtered = filtered.filter((slice) => {
				console.log(slice.Topic);
				return slice.Topic && slice.Topic.toUpperCase().includes(topicFilter.toUpperCase());
			});
		}
		if (difficultyFilter !== "") {
			filtered = filtered.filter((slice) => {
				return slice.Difficulty && slice.Difficulty === difficultyFilter;
			});
		}

		return (
			<div className="slice-list-children ease-in-anim section">
				{filtered.map((slice) => {
					return <SliceSummary slice={slice}></SliceSummary>;
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
