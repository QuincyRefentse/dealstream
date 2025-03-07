// Import dependencies
import React, { useRef, useEffect, useCallback } from "react";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./utility";

function Camera() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Define the runCoco function using useCallback
  const runCoco = useCallback(async () => {
    const net = await cocossd.load();
    console.log("Coco-SSD model loaded.");

    // Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 100); // Reduce interval for better performance (10 FPS)
  }, []); // Empty dependency array ensures it only runs once on mount

  const detect = async (net) => {
    // Check if webcam data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const obj = await net.detect(video);

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx);
    }
  };

  useEffect(() => {
    runCoco(); // Call the runCoco function
  }, [runCoco]); // Add runCoco as a dependency

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 8,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default Camera;
