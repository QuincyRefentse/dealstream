import React, { useRef, useEffect, useCallback } from "react";
import * as cocossd from "@tensorflow-models/coco-ssd"; // Import the Coco-SSD model
import Webcam from "react-webcam"; // Import the Webcam component

// Drawing utility function (For demo, you can extend it based on your needs)
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

  // Use useCallback to memoize the runCoco function
  const runCoco = useCallback(async () => {
    const net = await cocossd.load(); // Load the COCO-SSD model

    // Loop and detect objects in the video stream
    setInterval(() => {
      detect(net);
    }, 100); // Detect every 100ms (10 FPS)
  }, []); // Empty dependency array means this will not change across renders

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
      console.log(obj);

      // Draw rectangles on canvas
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx); // Call the drawing utility function
    }
  };

  // Run the object detection when the component mounts
  useEffect(() => {
    runCoco();
  }, [runCoco]); // runCoco is now memoized and will not change on every render

  return (
    <div className="App">
      <header className="App-header">
        {/* Webcam feed */}
        <Webcam
          ref={webcamRef}
          muted={true}
          videoConstraints={{
            facingMode: "user", // Default to the front camera, but will allow switching
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
