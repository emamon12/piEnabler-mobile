/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {addClass} from '../../store/actions/classActions';

class AddClass extends Component {
    state = {
        classKey: '',
    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state);
        const { props, state } = this;
        props.addClass(state);

        props.history.push('/');
    }

    render() {
        const { auth } = this.props;
        if (!auth.uid) {
            return <Redirect to="/signin" />;
        }

        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Add new class</h5>
                    <div className="input-field">
                        <label htmlFor="classKey">Class Key</label>
                        <input type="text" name="classKey" id="classKey" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <button type="submit" className="btn red-bg red darken-3 z-depth-1">Add</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.firebase.auth,
});

const mapDispatchToProps = dispatch => ({
    addClass: classs => dispatch(addClass(classs)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddClass);
