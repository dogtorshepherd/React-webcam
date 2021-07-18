import React, { useState } from "react";
import Webcam from "react-webcam";

export const WebcamCapture = (props) => {
  const [mode, setMode] = useState("environment");
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    props.setImage(imageSrc);
  });

  return (
    <div className="webcam-container">
      <div className="webcam-img">
        {props.image === "" ? (
          <Webcam
            audio={false}
            height={200}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={220}
            videoConstraints={{ facingMode: mode }}
          />
        ) : (
          <img src={props.image} alt="" />
        )}
      </div>
      <div>
        {props.image !== "" ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              props.setImage("");
            }}
            className="webcam-btn"
          >
            Retake Image
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              capture();
            }}
            className="webcam-btn"
          >
            Capture
          </button>
        )}

        {mode === "environment" ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              setMode("user");
            }}
            className="webcam-btn"
          >
            User
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              setMode("environment");
            }}
            className="webcam-btn"
          >
            Environment
          </button>
        )}
      </div>
    </div>
  );
};
