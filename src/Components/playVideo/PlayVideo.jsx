import React, { useEffect, useState } from "react";
import "./PlayVideo.css";
import Videos1 from "../../assets/video.mp4";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import jack from "../../assets/jack.png";
import user_profile from "../../assets/user_profile.jpg";
import { API_KEY, value_counter } from "../../data";
import moment  from "moment";

const PlayVideo = ({videoId}) => {

  const [apiData,setApiData] = useState(null);

  const fetchVideoData = async () => {
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}` 
    await fetch (videoDetails_url).then(res=>res.json()).then(data => setApiData(data.items[0]));
  }

  useEffect(()=>{
    fetchVideoData();
  },[])
  return (
    <div className="play-video">
      {/* <video src={Videos1} controls autoPlay muted></video> */}
<iframe
  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerPolicy="strict-origin-when-cross-origin"
  allowFullScreen
></iframe>
      <h3>{apiData?apiData.snippet.title:"title "}</h3>
      <div className="play-video-info">
        <p>{apiData?value_counter(apiData.statistics.viewCount):"16k"} Views &bull; { apiData?moment(apiData.snippet.publishedAt).fromNow():""}</p>
        <div>
        <span>
          <img src={like} alt="" />
          {apiData?value_counter(apiData.statistics.likeCount):""}
        </span>
        <span>
          <img src={dislike} alt="" />2
        </span>
        <span>
          <img src={share} alt="" />
          Share
        </span>
        <span>
          <img src={save} alt="" />
          Save
        </span>
      </div>
      </div>
      
      <hr />
      <div className="publisher">
        <img src={jack} alt="" />
   <div>
    <p>GreatStack</p>
    <span> 1M Subscribers</span>
   </div>
   <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>{apiData?apiData.snippet.description.slice(0,250):""}</p>
        <hr />
        <h4> {apiData?value_counter(apiData.statistics.commentCount):"130"}</h4>
        <div className="comment">
            <img src={user_profile} alt="" />
            <div>
                <h3>Jack Nicholson <span>1 day ago</span></h3>
                <p> very nice</p>
                <div className="comment-action">
                    <img src={like} alt="" />
                    <span>244</span>
                    <img src={dislike} alt="" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PlayVideo;
