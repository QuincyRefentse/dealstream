import React, { useRef, useEffect, useCallback, useState } from "react";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./utility";
import * as tf from "@tensorflow/tfjs";

function Camera() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Update dimensions on window resize
  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  // Add event listener for resizing
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Set TensorFlow.js backend (WebGL or CPU)
  const setBackend = async () => {
    try {
      await tf.setBackend("webgl"); // Set to WebGL for GPU acceleration, or 'cpu' if WebGL isn't supported
    } catch (error) {
      console.error("Error setting TensorFlow.js backend:", error);
    }
  };

  // Initialize Coco-SSD model
  const runCoco = useCallback(async () => {
    await setBackend(); // Ensure the backend is set before loading the model
    const net = await cocossd.load();
    console.log("Coco-SSD model loaded.");

    // Loop and detect objects
    const detectLoop = () => {
      detect(net);
      requestAnimationFrame(detectLoop); // Keep calling detect on every frame
    };

    requestAnimationFrame(detectLoop); // Start the detection loop
  }, []); // Empty dependency array ensures it only runs once on mount

  const detect = async (net) => {
    // Check if webcam data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make detections
      const obj = await net.detect(video);

      //Logger to report detected objects
      console.log("Detected objects:", obj); //

      // Draw bounding boxes and labels
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx);
    }
  };

  useEffect(() => {
    runCoco(); // Call the runCoco function once on mount
  }, [runCoco]); // Add runCoco as a dependency

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true}
          onLoadedMetadata={() => {
            // Wait for video metadata to load before setting canvas size
            const video = webcamRef.current.video;
            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;
          }}
          videoConstraints={{
            facingMode: "user", // Use front camera (can be modified for back camera)
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: dimensions.width,
            height: dimensions.height,
            objectFit: "cover", // Ensures the webcam feed covers the entire screen
            zIndex: 9,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: dimensions.width,
            height: dimensions.height,
            zIndex: 8,
          }}
        />
      </header>
    </div>
  );
}

export default Camera;
