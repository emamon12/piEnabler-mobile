import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Modal, Button, Row, Col, Preloader, Textarea } from 'react-materialize'
import { ChangeMessage } from '../../store/actions/classActions';

class ClassDetails extends Component {
    state = {
        classMessage: "",
        formMode: false
    }

    componentDidMount = (e) => {
        this.setState(state => ({
            ...state,
            classMessage: this.props.classs.messageOfTheDay
        }))
    }

    handleButtonClick = (e) => {
        const { target } = e;

        this.setState(state => ({
            classMessage: target.value,
            formMode: true
        }));

    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));

    }

    handleSubmitClick = (e) => {
        const { target } = e;

        const { props } = this;

        const { value } = target

        this.setState(state => ({
            ...state,
            formMode: false
        }))

        const classId = props.classsId;

        const composite = { classId, value };

        props.ChangeMessage(composite);

    }

    render() {
        const { props } = this;

        const { auth } = props;
        if (!auth.uid) {
            return <Redirect to='/signin/' />
        }

        const { classs } = props
        const { user } = props

        const formMode = this.state.formMode
        const message = this.state.classMessage

        if (user && classs && classs.currSession !== "") {
            return (
                <div>
                    <div className="container section classs-details">
                        <div className="card z-depth-0">
                            <div className="card-content">
                                <span className="card-title">{classs.classIdentifier} - {classs.classSection} - {classs.classsName} - Message Of The Day</span>
                                {formMode ? <Row>
                                    <Textarea name="classMessage" id="classMessage" onChange={this.handleChange} defaultValue={message}
                                        s={12}
                                        m={12}
                                        l={12}
                                        xl={12}
                                    />
                                </Row> : <p>{message}</p>}
                            </div>
                            <div className="card-action grey lighten-4 grey-text">
                                <div>Teacher: {classs.teacherFirstName} {classs.teacherLastName}</div>
                                <div>{classs.classLecture}</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="flexbox">
                                <Link to={'/session/' + classs.currSession} key={classs.currSession}>
                                    <div className="col">
                                        <button type="button" className="btn red-bg red darken-3 z-depth-1 waves-effect waves-light">Join Session</button>
                                    </div>
                                </Link>

                                {(user.userRole === "admin" || user.userRole === "instructor") ?
                                    <div className="col">
                                        <button type="button" className="btn red-bg red darken-3 z-depth-1 waves-effect waves-light">End Session</button></div> : null}

                                {(user.userRole === "admin" || user.userRole === "instructor") ?
                                    <Link to={'/session/' + classs.currSession + '/projection/'} key={classs.currSession} >
                                        <div className="col"><button type="button" className="btn red-bg red darken-3 z-depth-1 waves-effect waves-light">Projection</button></div>
                                    </Link>
                                    : null}

                                {(user.userRole === "admin" || user.userRole === "instructor") ?
                                    <Link to={'/session/' + classs.currSession + '/presentation/'} key={classs.currSession} >
                                        <div className="col"><button type="button" className="btn red-bg red darken-3 z-depth-1 waves-effect waves-light">Presentation</button></div>
                                    </Link>
                                    : null}

                                {(user.userRole === "admin" || user.userRole === "instructor") ?
                                    <div className="col">
                                        {(!formMode) ?
                                            <button onClick={this.handleButtonClick} type="button" value={message} className="btn red-bg red darken-3 z-depth-1 waves-effect waves-light">Change Message</button>
                                            :
                                            <button onClick={this.handleSubmitClick} type="button" value={message} className="btn red-bg red darken-3 z-depth-1 waves-effect waves-light">Save</button>}
                                    </div> :
                                    null}
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else if (user && classs && classs.currSession === "") {
            return (
                <div>
                    <div className="container section classs-details">
                        <div className="card z-depth-0">
                            <div className="card-content">
                                <span className="card-title">{classs.classIdentifier} - {classs.classSection} - {classs.classsName} - Message Of The Day</span>
                                {formMode ? <Row>
                                    <Textarea name="classMessage" id="classMessage" onChange={this.handleChange} defaultValue={message}
                                        s={12}
                                        m={12}
                                        l={12}
                                        xl={12}
                                    />
                                </Row> : <p>{message}</p>}

                            </div>
                            <div className="card-action grey lighten-4 grey-text">
                                <div>Teacher: {classs.teacherFirstName} {classs.teacherLastName}</div>
                                <div>{classs.classLecture}</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="flexbox">
                                <div className="col">
                                    <Modal className="modal1" options={{ preventScrolling: false, inDuration: 500, outDuraton: 500 }} actions={<Button waves="red" modal="close" flat>Okay</Button>} header="No Session Active" trigger={<button data-target="modal1" className="btn red-bg red darken-3 z-depth-1 waves-effect waves-light">Join Session</button>
                                    }>
                                        The class session is currently not active.
                            </Modal>
                                </div>
                                {(user.userRole === "admin" || user.userRole === "instructor") ?
                                    <div className="col">
                                        <button type="button" className="btn red-bg red darken-3 z-depth-1 waves-effect waves-light">Start Session</button>
                                    </div> : null}

                                {(user.userRole === "admin" || user.userRole === "instructor") ?
                                    <div className="col">
                                        {(!formMode) ?
                                            <button onClick={this.handleButtonClick} type="button" value={message} className="btn red-bg red darken-3 z-depth-1 waves-effect waves-light">Change Message</button>
                                            :
                                            <button onClick={this.handleSubmitClick} type="button" value={message} className="btn red-bg red darken-3 z-depth-1 waves-effect waves-light">Save</button>}
                                    </div> :
                                    null}
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container section classs-details">
                    <div className="card z-depth-1">
                        <div className="card-content">
                            <span className="card-title">
                                <Row>
                                    <Col s={12}>
                                        <Preloader flashing size="big" />
                                    </Col>
                                </Row>
                            </span>
                        </div>
                    </div>
                </div>
            );
        };
    }

}

//this basically just gets the classes objects from firestore and if there are classes to be shown, it maps it
const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { classes } = state.firestore.data;
    const { users } = state.firestore.data;
    const classs = classes ? classes[id] : null
    const user = users ? users[state.firebase.auth.uid] : null
    return {
        classs: classs,
        auth: state.firebase.auth,
        user: user,
        classsId: id
    };
};

const mapDispatchToProps = dispatch => ({
    ChangeMessage: classs => dispatch(ChangeMessage(classs)),
});

export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect(['users']))(ClassDetails)
