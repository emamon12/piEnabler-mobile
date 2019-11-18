import React, { Component } from "react";
class LandingPage extends Component {
  state = {
    currSection: 1
  };

  render() {
    return (
      <div className="dashboard">
        <div id="landing-row" className="row">
          <div id="landing-style" className="col s12 m12 ease-in-anim">
            <div id="landing-card-outer" className="card">
              <div id="landing-card-top-content" className="card-content white-text">
                <div className="row">
                  <div className="col s12 m4 offset-m1" style={{ marginTop: "2%" }}>
                    <div>
                      <span className="card-title">What Is piEnabler?</span>

                      <p
                        className="pienabler-info"
                        style={{
                          marginLeft: "3%",
                          marginTop: "2%",
                          marginBottom: "5%"
                        }}
                      >
                        piEnabler is an application that enhances learning through peer instruction.
                      </p>
                    </div>

                    <div style={{ marginLeft: "4%" }}>
                      <span className="card-title">For Students</span>

                      <p
                        className="pienabler-info"
                        style={{
                          marginLeft: "3%",
                          marginTop: "2%",
                          marginBottom: "5%"
                        }}
                      >
                        Students will be able to receive instantenous feedback during class on their knowledge of the subject material. The polling
                        tool can help students test themselves of their understanding of topic and will be able to discuss answers with fellow
                        students, amplifying the student's comprehension.
                      </p>
                    </div>

                    <div style={{ marginLeft: "4%" }}>
                      <span className="card-title">For Instructors</span>
                      <p
                        className="pienabler-info"
                        style={{
                          marginLeft: "3%",
                          marginTop: "2%",
                          marginBottom: "5%"
                        }}
                      >
                        Instructors will have a better understanding of the overall climate of the classroom. With the use of the presentation and
                        polling tool, instructors can craft session specific presentations with the ability to, with limited capability, dynamically
                        shift the focus of the class on command.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="col s12 m4 offset-m2" style={{ marginTop: "2%" }}>
                      <span className="card-title">What Is Peer Instruction?</span>

                      <p
                        className="pienabler-info"
                        style={{
                          marginLeft: "3%",
                          marginTop: "2%",
                          marginBottom: "5%"
                        }}
                      >
                        Peer instruction is an interactive student-centered approach in teaching. It is a learning system that involves students
                        preparing outside of class, usually through readings or problems. Then, instructors propose questions and materials based on
                        student performance.
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="col s12 m4 offset-m2" style={{ marginTop: "2%" }}>
                      <span className="card-title">Why Peer Instruction?</span>

                      <p
                        className="pienabler-info"
                        style={{
                          marginLeft: "3%",
                          marginTop: "2%",
                          marginBottom: "5%"
                        }}
                      >
                        Instructors will be able to engage with students more readily, enhancing both the understanding the instructor's view on the
                        class climate and the student's understanding of the class topics.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default LandingPage;
