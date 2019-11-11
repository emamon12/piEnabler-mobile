import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { NavLink, Link } from 'react-router-dom'
import { Modal, Button, Row, Col, Preloader, Textarea } from 'react-materialize'
import { ChangeMessage } from '../../store/actions/classActions'
import { RemoveSession } from '../../store/actions/classActions'
import { LoadSession } from '../../store/actions/classActions'

class ClassDetails extends Component {
    state = {
        classMessage: "",
        formMode: false,
        startASession: false,
        sessionToLoad: "",
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

    handleSessionClick = (e) => {

        this.setState(state => ({
            startASession: true,
        }))
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

    handleEndSession = (e) => {
        const { props } = this;
        const classId = props.classsId;
        const { classs } = props;

        const sessionId = classs.currSession;

        const composite = { classId, sessionId };

        props.RemoveSession(composite);
    }

    handleSessionLoad = (e) => {
        e.preventDefault();
        const { props, state } = this;
        const classId = props.classsId;
        const sessionToLoad = state.sessionToLoad;
        const composite = { classId, sessionToLoad };

        props.LoadSession(composite)

        this.setState(state => ({
            startASession: false,
        }))
    }

    render() {
        const { props } = this;
        const { auth } = props;
        const { classs, loadingError, classsId } = props

        if (!auth.uid) {
            return <Redirect to='/signin/' />
        }

        const { user } = props

        const formMode = this.state.formMode
        const message = this.state.classMessage
        

        const buttonClassName = "btn purple-bg purple darken-3 z-depth-1 waves-effect waves-light unify"

        if (user && classs && classs.currSession !== "") {
            return (
                <div>
                    <div className="container section classs-details">
                        <div className="card z-depth-0">
                            <div className="card-content">
                                {(user.userRole === "admin" || user.userRole === "instructor") ?
                                    <p>Class Key: {classsId}</p>
                                    :
                                    null
                                }
                                <span className="card-title">{classs.classIdentifier} - {classs.classSection} - {classs.classsName} - Message Of The Day</span>
                                {formMode ? <Row className="class-message">
                                    <Textarea name="classMessage" id="classMessage" onChange={this.handleChange} defaultValue={classs.messageOfTheDay}
                                        s={12}
                                        m={12}
                                        l={12}
                                        xl={12}
                                    />
                                </Row> : <p className="class-message">{classs.messageOfTheDay}</p>}
                            </div>
                            <div className="card-action grey lighten-4 grey-text">
                                <div>Teacher: {classs.teacherFirstName} {classs.teacherLastName}</div>
                                <div>{classs.classLecture}</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="flexbox">
                                {(classs.currSession !== "") ?
                                    <Link to={'/session/' + classs.currSession} key={classs.currSession}>
                                        <div className="col mar1">
                                            <button type="button" className={buttonClassName}>Join Session</button>
                                        </div>
                                    </Link>
                                    :
                                    null
                                }

                                {(user.userRole === "admin" || user.userRole === "instructor") ?
                                    <div className="col mar1">
                                        <button type="button" onClick={this.handleEndSession} className={buttonClassName}>End Session</button></div> : null}
                   
                                {((user.userRole === "admin" || user.userRole === "instructor") && classs.currSession !== "") ?
                                    <NavLink to={'/session/' + classs.currSession + '/clicker/'} key={classs.currSession + "pres"} >
                                        <div className="col mar1">
                                            <button type="button"
                                                className={buttonClassName}>
                                                Clicker
                                            </button>
                                        </div>
                                    </NavLink>
                                    : null}

                                {((user.userRole === "admin" || user.userRole === "instructor") && classs.currSession !== "") ?
                                    <NavLink to={'/session/' + classs.currSession + '/dashboard/'} key={classs.currSession + "pres"} >
                                        <div className="col mar1">
                                            <button type="button"
                                                className={buttonClassName}>
                                                Dashboard
                                            </button>
                                        </div>
                                    </NavLink>
                                    : null}


                                    {(classs.currSession !== "") ?
                                    <NavLink to={'/session/' + classs.currSession + '/projection/' } key={classs.currSession + "proj"} >
                                        <div className="col mar1">
                                            <button type="button" className={buttonClassName}>
                                                Projection
                                                </button>
                                        </div>
                                    </NavLink>
                                    : null}
                                {((user.userRole === "admin" || user.userRole === "instructor") && classs.currSession !== "") ?
                                    <div className="col mar1">
                                        {(!formMode) ?
                                            <button onClick={this.handleButtonClick} type="button" value={message} className={buttonClassName}>Change Message</button>
                                            :
                                            <button onClick={this.handleSubmitClick} type="button" value={message} className={buttonClassName}>Save</button>}
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
                                {(user.userRole === "admin" || user.userRole === "instructor") ?
                                    <p>Class Key: {classsId}</p>
                                    :
                                    null
                                }
                                <span className="card-title">{classs.classIdentifier} - {classs.classSection} - {classs.classsName} - Message Of The Day</span>
                                {formMode ? <Row className="class-message">
                                    <Textarea data-length={180} name="classMessage" id="classMessage" onChange={this.handleChange} defaultValue={classs.messageOfTheDay}
                                        s={12}
                                        m={12}
                                        l={12}
                                        xl={12}
                                    />
                                </Row> : <p className="class-message">{classs.messageOfTheDay}</p>}

                            </div>
                            <div className="card-action grey lighten-4 grey-text">
                                <div>Teacher: {classs.teacherFirstName} {classs.teacherLastName}</div>
                                <div>{classs.classLecture}</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="flexbox">
                                <div className="col">
                                    <Modal className="modal1"
                                        options={{ preventScrolling: false, inDuration: 500, outDuraton: 500 }}
                                        actions={<Button waves="purple" modal="close" flat>Okay</Button>} header="No Session Active"
                                        trigger={<button data-target="modal1" className={buttonClassName}>
                                            Join Session
                                    </button>
                                        }>
                                        The class session is currently not active.
                            </Modal>
                                </div>
                                {((this.state.startASession === false) && (user.userRole === "admin" || user.userRole === "instructor")) ?
                                    <div className="col mar1">
                                        <button type="button" onClick={this.handleSessionClick} className={buttonClassName}>Start Session</button>
                                    </div> : null}

                                {(user.userRole === "admin" || user.userRole === "instructor") ?
                                    <div className="col mar1">
                                        {(!formMode) ?
                                            <button onClick={this.handleButtonClick} type="button" value={message}
                                                className={buttonClassName}>
                                                Change Message
                                            </button>
                                            :
                                            <button onClick={this.handleSubmitClick} type="button" value={message}
                                                className={buttonClassName}>
                                                Save</button>}
                                    </div> :
                                    null}
                            </div>

                            {((this.state.startASession === true) && (user.userRole === "admin" || user.userRole === "instructor")) ?
                                <div className="row">
                                    <form onSubmit={this.handleSessionLoad} className="white z-depth-1">
                                        <div className="input-field">
                                            <label htmlFor="sessionToLoad">Input Session Plan To Load</label>
                                            <input
                                                type="text"
                                                name="sessionToLoad"
                                                id="sessionToLoad"
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </form>
                                </div>
                                :
                                null
                            }

                            {((this.state.startASession === true) && (user.userRole === "admin" || user.userRole === "instructor")) ?
                                <div className="row">
                                    <div className="center">
                                        <button onClick={this.handleSessionLoad} type="button" className={buttonClassName}>Load Session</button>
                                    </div>
                                </div>
                                :
                                null}

                            {loadingError ? <div className="center red-text error-msg center text-darken-1"><p>{loadingError}</p></div> : null}
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
        classsId: id,
        loadingError: state.classs.loadingError
    };
};

const mapDispatchToProps = dispatch => ({
    ChangeMessage: classs => dispatch(ChangeMessage(classs)),
    RemoveSession: classs => dispatch(RemoveSession(classs)),
    LoadSession: classs => dispatch(LoadSession(classs)),
});

export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect(['users', 'classes', 'sessions']))(ClassDetails)
