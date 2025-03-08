import React, { useRef, useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./utility";
import * as tf from "@tensorflow/tfjs";

function Camera() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isBackCamera, setIsBackCamera] = useState(false);

  // Update dimensions on window resize
  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const setBackend = async () => {
    try {
      await tf.setBackend("webgl");
    } catch (error) {
      console.error("Error setting TensorFlow.js backend:", error);
    }
  };

  const runCoco = useCallback(async () => {
    await setBackend();
    const net = await cocossd.load();
    console.log("Coco-SSD model loaded.");

    const detectLoop = () => {
      detect(net);
      requestAnimationFrame(detectLoop);
    };
    requestAnimationFrame(detectLoop);
  }, []);

  const detect = async (net) => {
    if (webcamRef.current && webcamRef.current.video.readyState === 4) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const obj = await net.detect(video);
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx);

      // Save detection results
      const timestamp = new Date().toISOString();
      const newReports = obj.map((prediction, index) => ({
        objectNo: `${timestamp}-${index}`,
        objectType: prediction.class,
        objectProbability: Math.round(prediction.score * 100),
        timestamp: timestamp,
      }));

      const existingReports = JSON.parse(
        localStorage.getItem("detectionReports") || "[]"
      );
      const updatedReports = [...existingReports, ...newReports];
      localStorage.setItem("detectionReports", JSON.stringify(updatedReports));
    }
  };

  useEffect(() => {
    runCoco();
  }, [runCoco]);

  const switchCamera = () => {
    setIsBackCamera((prev) => !prev);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true}
          onLoadedMetadata={() => {
            const video = webcamRef.current.video;
            canvasRef.current.width = video.videoWidth;
            canvasRef.current.height = video.videoHeight;
          }}
          videoConstraints={{
            facingMode: isBackCamera ? "environment" : "user",
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: dimensions.width,
            height: dimensions.height,
            objectFit: "cover",
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
            zIndex: 10,
          }}
        />

        {/* Control Buttons */}
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            zIndex: 11,
          }}
        >
          <button
            onClick={switchCamera}
            style={buttonStyle}
            title="Switch Camera"
          >
            🔄
          </button>

          <button
            onClick={() => navigate("/reports")}
            style={buttonStyle}
            title="View Reports"
          >
            📊
          </button>

          <button 
            onClick={() => navigate("/home")}
            style={buttonStyle}
            title="Go to Home"
          >
            🏠
          </button>
        </div>
      </header>
    </div>
  );
}

const buttonStyle = {
  width: 50,
  height: 50,
  borderRadius: "50%",
  border: "none",
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  cursor: "pointer",
  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "transform 0.2s",
  fontSize: "20px",
};

export default Camera;