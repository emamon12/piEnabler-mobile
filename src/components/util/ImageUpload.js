import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";

// Setup Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBT8CS1nu1PqeMDq_VnMu2LsfOZM_7eMQo",
  storageBucket: "piesiue.appspot.com"
});

class App extends React.Component {
  state = {
    filename: "",
    downloadURL: "",
    isUploading: false,
    uploadProgress: 0
  };

  handleUploadStart = () =>
    this.setState({
      isUploading: true,
      uploadProgress: 0
    });

  handleProgress = progress =>
    this.setState({
      uploadProgress: progress
    });

  handleUploadError = error => {
    this.setState({
      isUploading: false
      // Todo: handle error
    });
    console.error(error);
  };

  handleUploadSuccess = async filename => {
    const downloadURL = await firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL();

    this.setState(oldState => ({
      filename: filename,
      downloadURL: downloadURL,
      uploadProgress: 100,
      isUploading: false
    }));
  };

  render() {
    return (
      <div>
        <FileUploader
          accept="image/*"
          name="image-uploader"
          storageRef={firebase.storage().ref("images")}
          onUploadStart={this.handleUploadStart}
          onUploadError={this.handleUploadError}
          onUploadSuccess={this.handleUploadSuccess}
          onProgress={this.handleProgress}
        />

        <p>Progress: {this.state.uploadProgress}</p>
        <p>Filename: {this.state.filename}</p>

        <div>
           <img src={this.state.downloadURL} /> 
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
