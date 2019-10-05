/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createSlice } from '../../store/actions/sliceActions';
import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Switch from '@material-ui/core/Switch';
import { Switch } from 'react-materialize'
import Textarea from 'muicss/lib/react/textarea';

class CreateSlice extends Component {
    state = {
        Lecture: '',
    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }

    HandleLectureChange = (e) => {
        const { target } = e
        console.log(target.checked)
        console.log(target.id)

        this.setState(state => ({
            ...state,
            [target.id]: target.checked,
        }));
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { props, state } = this;
        props.createSlice(state);
        //the push acts as a redirect... when the form is submitted... redirect to home
        props.history.push('/createSlice');
    }


    render() {
        //just check if the user is authenticated
        const { auth } = this.props;
        if (!auth.uid) {
            return <Redirect to="/signin" />;
        }

        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Create a new Slice</h5>

                    <Switch offLabel="Question" onLabel="Lecture" onChange={this.HandleLectureChange} id="Lecture" />

                    {this.state.Lecture ?
                        (
                            <form onSubmit={this.handleSubmit} style={{ marginTop: 0 }} className="white">
                                <div className="input-field">
                                    <Textarea type="text" name="Question" id="Question" onChange={this.handleChange} floatingLabel={true}  label="Lecture Material"  />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="Topic">Topic</label>
                                    <input type="text" name="Topic" id="Topic" onChange={this.handleChange} />
                                </div>
                                <div className="input-field" style={{ paddingBottom: "2rem" }}>
                                    <button type="submit" className="btn red-bg red darken-3 right z-depth-1" >Create</button>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={this.handleSubmit} style={{ marginTop: 0 }} className="white">
                                <div className="input-field">
                                    <label htmlFor="Question">Question</label>
                                    <input type="text" name="Question" id="Question" onChange={this.handleChange} />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="Answer1">Answer 1</label>
                                    <input type="text" name="Answer1" id="Answer1" onChange={this.handleChange} />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="Answer2">Answer 2</label>
                                    <input type="text" name="Answer2" id="Answer2" onChange={this.handleChange} />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="Answer3">Answer 3</label>
                                    <input type="text" name="Answer3" id="Answer3" onChange={this.handleChange} />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="Answer4">Answer 4</label>
                                    <input type="text" name="Answer4" id="Answer4" onChange={this.handleChange} />
                                </div>

                                <div className="input-field">
                                    <label htmlFor="CorrectAnswer">Correct Answer</label>
                                    <input type="text" name="CorrectAnswer" id="CorrectAnswer" onChange={this.handleChange} />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="Topic">Topic</label>
                                    <input type="text" name="Topic" id="Topic" onChange={this.handleChange} />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="Difficulty">Difficulty</label>
                                    <input type="text" name="Difficulty" id="Difficulty" onChange={this.handleChange} />
                                </div>

                                <div className="input-field" style={{ paddingBottom: "2rem" }}>
                                    <button type="submit" className="btn red-bg red darken-3 right z-depth-1" >Create</button>
                                </div>
                            </form>
                        )}
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.firebase.auth,
});

const mapDispatchToProps = dispatch => ({
    createSlice: slices => dispatch(createSlice(slices)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateSlice);