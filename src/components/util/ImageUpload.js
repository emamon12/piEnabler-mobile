import React from "react";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";

class ImageUpload extends React.Component {
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

  handleProgress = (progress) =>
    this.setState({
      uploadProgress: progress
    });

  handleUploadError = (error) => {
    this.setState({
      isUploading: false
      // Todo: handle error
    });
    console.error(error);
  };

  handleUploadSuccess = async (filename) => {
    const downloadURL = await firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL();

    this.setState((oldState) => ({
      filename: filename,
      downloadURL: downloadURL,
      uploadProgress: 100,
      isUploading: false
    }));
    this.props.uploadGoog(filename, downloadURL);
  };

  render() {
    let style = {
      border: "solid #242222b5 3px",
      padding: "1em",
      borderRadius: "1.5em"
    };
    if (this.state.filename) {
      style.height = "37vh";
    }
    return (
      <div style={{ padding: "2em" }}>
        <FileUploader
          accept="image/*"
          name="image-uploader"
          storageRef={firebase.storage().ref("images")}
          onUploadStart={this.handleUploadStart}
          onUploadError={this.handleUploadError}
          onUploadSuccess={this.handleUploadSuccess}
          onProgress={this.handleProgress}
        />

        <h3>Progress: {this.state.uploadProgress}</h3>
        <h3>Filename: {this.state.filename}</h3>

        <div style={{ textAlign: "center", height: "35vh" }}>
          <img style={style} alt="" src={this.state.downloadURL} />
        </div>
      </div>
    );
  }
}

export default ImageUpload;
