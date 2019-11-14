/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { addClass } from "../../store/actions/classActions";

class AddClass extends Component {
    state = {
        classKey: ""
    };

    handleChange = (e) => {
        const { target } = e;

        this.setState((state) => ({
            ...state,
            [target.id]: target.value.trim()
        }));
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const { props, state } = this;
        console.log(state);
        props.addClass(state);

        props.history.push("/");
    };

    render() {
        const { auth, addClassError } = this.props;
        if (!auth.uid) {
            return <Redirect to="/landing" />;
        }

        return (
            <div className="container section">
                <form onSubmit={this.handleSubmit} className="white">
                    <h2 className="grey-text text-darken-3" style={{ textAlign: "center" }}>
                        Add A Class
                    </h2>
                    <div className="input-field">
                        <label htmlFor="classKey">Class Key</label>
                        <input type="text" name="classKey" id="classKey" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <button type="submit" className="btn purple-bg purple darken-3 z-depth-1">
                            Add
                        </button>
                    </div>
                    {addClassError ? (
                        <div className="red-text center text-darken-1">
                            <p>{addClassError}</p>
                        </div>
                    ) : null}
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.firebase.auth,
    addClassError: state.classs.addClassError
});

const mapDispatchToProps = (dispatch) => ({
    addClass: (classs) => dispatch(addClass(classs))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddClass);
