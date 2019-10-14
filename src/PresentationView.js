import React from 'react';
import {Button} from 'react-native';

function getHistogram() {

}

function showHistogram() {

}

function getQuestions() {

}

function showCurrentSlice() {

}

function nextSlice() {

}

function sendQuestionsToStudents() {

}

function harderSlice() {

}

function similarSlice() {

}

function getNewSlice() {

}

function showLectureMaterial() {

}
class PresentationView {
    render() {
        return (
            <div className="wrapper">

            <div className="question-wrapper">
                <div className="student-question-screen">

                </div>
                <Button onPress = {this.sendQuestionsToStudents}
                            title = "Deploy Questions"
                            color = "red"/>
    
                    </div>

    
            <div className="top-container">
                <div className="left">
                    <div className="top-left">
                        <Button onPress = {this.showCurrentSlice}
                            title = "Current Slice"
                            color = "red"/>
    
                    </div>
    
                    <div className="bottom-left">
                    <Button onPress = {this.nextSlice}
                            title = "Next Slice"
                            color = "red"/>
    
                    </div>
                </div>
    
                <div className="right">
                    <div className="histogram">
                    <Button onPress = {this.getHistogram}
                            title = "Show Histogram"
                            color = "red"/>    
                    </div>
                    
                    <div className="bottom-right">

                    </div>
                </div>
            </div>
    
            <div className="ribbon">
             <div className="lecture">
             <Button onPress = {this.showLectureMaterial}
                            title = "Lecture Slice"
                            color = "red"/>
                </div>
                <div className="similar-slice"> 
                <Button onPress = {this.similarSlice}
                            title = "Similar Slice"
                            color = "red"/>
                </div>
                <div className="harder-slice">
                <Button onPress = {this.harderSlice}
                            title = "Harder Slice"
                            color = "red"/>
                </div>
                <div className="new-slice">
                <Button onPress = {this.getNewSlice}
                            title = "New Topic"
                            color = "red"/>
                </div>
                <div className="histogram-div">
                <Button onPress = {this.showHistogram}
                            title = "Show Histogram"
                            color = "red"/>
                </div>-->
            </div>
    
        </div>
        );

    }

}

export default PresentationView

const sytle = StyleSheet.create({
   
    /*h1: {
        color: black,
        alignItems: 'center'
    }
    
    wrapper: {
        alignItems: 'center',
        margin: auto 0
    }
    
    @media only screen and (max-width:800px) {
    /* For tablets: */
    /*.wrapper {
    width: 80%;
    padding: 0;
    }
    img {
    width: 45%;
    height: 45%;
    }
    }
    @media only screen and (max-width:500px) {
    /* For mobile phones: */
    /*.wrapper {
    width: 70%;
    }
    
    img {
    width: 35%;
    height: 35%;
    
    }
    
    #wrapper {
        width: 100%;
        margin: 0 auto;
    }
    
    #top-container {
        width:10px;
        display:block;
        vertical-align: middle;
        float:right;
        padding-left: 100px;
    }
    
    #left {
    
    left:0;
    }
    
    #right {
    right:0;
    }
    
    #top-left {
    position: absolute;
    margin-top: -10px;
*/
})