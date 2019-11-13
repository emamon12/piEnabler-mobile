import React from "react";
import { Link } from "react-router-dom";

const SliceSummary = ({ slice, handleButtonClick }) => {
  return (
    <div className="card z-depth-0 classs-summary">
      <div className="card-content black-text ">
        <span className="slice-id-text">
          <b>Slice ID:</b> {slice.id}{" "}
        </span>
        <span className="slice-add-button">
          <button
            type="button"
            className="btn purple-bg purple darken-3 z-depth-1"
            value={slice.id}
            onClick={handleButtonClick}
          >
            Add
          </button>
        </span>
        <Link
          to={"/slices/" + slice.id}
          key={slice.id}
          style={{ color: "#424242" }}
        >
          <span className="card-title">{slice.Title}</span>
          <span className="card-title">{slice.filename}</span>
          <p>Topic: {slice.Topic}</p>

          {slice.Cheese ? (
            <p>Image Slice</p>
          ) : slice.Lecture === true ? (
            <p>Lecture Slice: {slice.Title && slice.Title}</p>
          ) : (
            <p>Question Slice: {slice.Question && slice.Question}</p>
          )}
        </Link>
      </div>
    </div>
  );
};

export default SliceSummary;
