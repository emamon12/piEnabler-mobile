import React from 'react';
import SessionPlanSummary from './SessionPlanSummary'
import { Link } from 'react-router-dom'
import { Row, Col, Preloader } from 'react-materialize'

const SessionPlanList = ({ sessionplans }) => {
    if (sessionplans) {
        return (
            <div className="session-plans-list ease-in-anim  section">
                {sessionplans && sessionplans.map(sessionplans => {
                    return (
                        <Link to={'/sessionplans/' + sessionplans.id} key={sessionplans.id}>
                            <SessionPlanSummary sessionplans={sessionplans} ></SessionPlanSummary>
                        </Link>
                    )
                })}
            </div>
        )
    } else {
        return (
            <div className="section">
                <Row>
                    <Col s={12} className="centerloader">
                        <Preloader flashing size="big"/>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default SessionPlanList