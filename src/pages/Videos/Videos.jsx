import React from "react";
import "./Videos.css";
import PlayVideo from "../../Components/playVideo/PlayVideo";
import Recommended from "../../Components/Recommended/Recommended";
import { useParams } from "react-router-dom";
const Videos = () => {
  const {videoId, categoryId} = useParams();

  return (
    <div className="play-container">
      <PlayVideo videoId={videoId} />
      <Recommended categoryId={categoryId} />
    </div>
  );
};

export default Videos;
