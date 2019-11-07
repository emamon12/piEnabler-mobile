import React, { Component } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class SliceDetails extends Component {
    render() {
        //just check if the user is authenticated
        const { props } = this;
        const { auth, sliceid, slice } = props;

        const textStyle = "grey-text text-darken-3"

        if (!auth.uid) {
            return <Redirect to="/signin" />;
        }
        if (slice && slice.Cheese){
            return(
                    <div className="container section">
                        <form className="white">
                            <h5 className={textStyle}>Slice ID: {sliceid}</h5>
                            <h2 className={textStyle}>{slice.Title}</h2>
                            <br />
    
                            <span>
                                <h3 className={textStyle}>Content: {slice.filename} </h3>
                                <div style={{textAlign: "center"}}>
                                    <img style={{height: "45vh", border: "solid #242222b5 3px",	padding: "1em",	borderRadius: "1.5em"}} src={slice.url} /> 

                                </div>
                                <br />
                                <p>Topic: {slice.Topic}</p>
                            </span>
    
    
                        </form>
                    </div>
            )
        }else{
            if (slice && slice.Lecture === true) {
                return (
                    <div className="container section">
                        <form className="white">
                            <h5 className={textStyle}>Slice ID: {sliceid}</h5>
                            <h2 className={textStyle}>{slice.Title}</h2>
                            <br />
    
                            <span>
                                <h3 className={textStyle}>Content: </h3>
                                <p className={textStyle}>{slice.Question}</p>
                                <br />
                                <p>Topic: {slice.Topic}</p>
                            </span>
    
    
                        </form>
                    </div>
                );
            } else {
                return (
                    <div className="container section">
                        <form className="white">
                            <h5 className={textStyle}>Slice ID: {sliceid}</h5>
                            <h2 className={textStyle}>{slice.Title}</h2>
                            <br />
                            <span>
                                <h3 className={textStyle}>Question: </h3>
                                <p className="grey-text text-darken-3 class-message" >{slice.Question}</p>
                                <h3 className={textStyle}>Answers </h3>
                                <p>Answer 1: {slice.Answer1}</p>
                                <p>Answer 2: {slice.Answer2}</p>
                                <p>Answer 3: {slice.Answer3}</p>
                                <p>Answer 4: {slice.Answer4}</p>
                                <p>Correct Answer: {slice.CorrectAnswer}</p>
                                <p>
                                    <br />
                                </p>
                                <p>Topic: {slice.Topic}</p>
                                <p>Difficulty: {slice.Difficulty}</p>
                            </span>
                        </form>
                    </div>
                );
            }
        }



    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { slices } = state.firestore.data;
    const slice = slices ? slices[id] : null
    return {
        slice: slice,
        auth: state.firebase.auth,
        sliceid: id,
    };
};

export default compose(connect(mapStateToProps), firestoreConnect(['slices']))(SliceDetails);