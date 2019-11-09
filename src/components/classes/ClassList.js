import React from "react";
import ClassSummary from "./ClassSummary";
import { Link } from "react-router-dom";
import { Row, Col, Preloader } from "react-materialize";

const ClassList = ({ user, classes }) => {
	if (classes && user) {
		return (
			<div className="classs-list section">
				{user &&
					classes &&
					classes.map((classs) => {
						var registeredClasses = user.registeredClasses;
						var regClass;

						// eslint-disable-next-line no-lone-blocks
						//checks  the class studentId array to see if the userID is in there.
						for (regClass in registeredClasses) {
							if (registeredClasses[regClass] === classs.id) {
								return (
									<Link to={"/classes/" + classs.id} key={classs.id}>
										<ClassSummary classs={classs}></ClassSummary>
									</Link>
								);
							}
						}
						return null;
						// eslint-disable-next-line no-lone-blocks
						//if the student is registered in class, the class shows up in dashboard
						// eslint-disable-next-line array-callback-return
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

export default ClassList;
