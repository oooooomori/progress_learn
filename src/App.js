import React, { useEffect, useState } from "react";
import { downloadImage } from "./service";
import ProgressBar from "./ProgressBar";
import "./styles.css";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchImage();
  }, []);

  function fetchImage() {
    setLoading(true);
    downloadImage({
      onDownloadProgress: progressEvent => {
        const percentage = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentage);
        if (percentage === 100) {
          setTimeout(() => {
            setLoading(false);
          }, 400);
        }
      }
    });
  }

  function fetchImageAgain() {
    setProgress(0);
    fetchImage();
  }

  return (
    <div className="App">
      {loading && <ProgressBar percentage={progress} />}
      <button type="button" onClick={fetchImageAgain}>
        Fetch Again
      </button>
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
