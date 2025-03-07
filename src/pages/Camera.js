import React, { useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd"; 

// Import the Coco-SSD model : STEP 1
import Webcam from "react-webcam";

//import "./App.css";

// Drawing utility function (For demo, you can extend it based on your needs) : STEP 2


const drawRect = (detections, ctx) => {
  detections.forEach((prediction) => {
    const [x, y, width, height] = prediction.bbox;
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "red";
    ctx.fillStyle = "red";
    ctx.stroke();
    ctx.fillText(
      `${prediction.class} - ${Math.round(prediction.score * 100)}%`,
      x,
      y > 10 ? y - 5 : 10
    );
  });
};

function Camera() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function to load model and detect objects
  const runCoco = async () => {

    // Load the COCO-SSD model : STEP 4 : 

    const net = await cocossd.load(); 

    // Loop and detect objects in the video stream
    setInterval(() => {
      detect(net);
    }, 100); // Detect every 100ms (10 FPS)
  };

  // Detection function
  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      // Set video width and height
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width and height to match video
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make detection
      const obj = await net.detect(video);

      // Draw rectangles on canvas
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx); // Call the drawing utility function
    }
  };

  // Run the object detection when the component mounts
  useEffect(() => {
    runCoco();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* Webcam feed */}
        <Webcam
          ref={webcamRef}
          muted={true}
          videoConstraints={{
            // No specific facing mode or deviceId
            facingMode: "user", // Default to the front camera, but will allow switching
            // Optional: leave undefined for all available cameras
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover", // Ensures the webcam feed covers the screen
            zIndex: 9,
          }}
        />

        {/* Canvas overlay */}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 8,
          }}
        />
      </header>
    </div>
  );
}

export default Camera;
