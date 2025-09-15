import React, { useEffect, useState } from "react";
import "./PlayVideo.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import { API_KEY, value_counter } from "../../data";
import moment from "moment";
import { useParams } from "react-router-dom";

const PlayVideo = () => {

 const {videoId} = useParams();

  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentsData, setCommentData] = useState([]);

  // fetch video details
  const fetchVideoData = async () => {
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    const res = await fetch(videoDetails_url);
    const data = await res.json();
    setApiData(data.items?.[0] || null);
  };

  // fetch channel + comments
  const fetchOtherData = async () => {
    if (!apiData) return;

    // channel data
    const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
    const channelRes = await fetch(channelData_url);
    const channelJson = await channelRes.json();
    setChannelData(channelJson.items?.[0] || null);

    // comments
    const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`;
    const commentRes = await fetch(comment_url);
    const commentJson = await commentRes.json();
    setCommentData(commentJson.items || []);
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    if (apiData) fetchOtherData();
  }, [apiData]);

  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        title="video player"
      ></iframe>

      <h3>{apiData?.snippet?.title || "Video Title"}</h3>

      <div className="play-video-info">
        <p>
          {apiData ? value_counter(apiData.statistics.viewCount) : "16k"} Views
          &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {apiData ? value_counter(apiData.statistics.likeCount) : ""}
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
        {channelData && (
          <img
            src={channelData.snippet?.thumbnails?.default?.url}
            alt={apiData?.snippet?.channelTitle || "channel"}
          />
        )}
        <div>
          <p>{apiData?.snippet?.channelTitle || ""}</p>
          <span>
            {channelData
              ? value_counter(channelData.statistics.subscriberCount)
              : ""}
          </span>
        </div>
        <button>Subscribe</button>
      </div>

      <div className="vid-description">
        <p>{apiData?.snippet?.description?.slice(0, 250) || ""}</p>
        <hr />
        <h4>
          {apiData ? value_counter(apiData.statistics.commentCount) : "0"}{" "}
          Comments
        </h4>

        {commentsData.length > 0 ? (
          commentsData.map((item, index) => (
            <div key={index} className="comment">
              <img
                src={
                  item.snippet?.topLevelComment?.snippet
                    ?.authorProfileImageUrl || ""
                }
                alt=""
              />
              <div>
                <h3>
                  {item.snippet?.topLevelComment?.snippet?.authorDisplayName}{" "}
                  <span>1 day ago</span>
                </h3>
                <p>{item.snippet?.topLevelComment?.snippet?.textDisplay}</p>
                <div className="comment-action">
                  <img src={like} alt="" />
                  <span>
                    {value_counter(
                      item.snippet?.topLevelComment?.snippet?.likeCount || 0
                    )}
                  </span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No comments found.</p>
        )}
      </div>
    </div>
  );
};

export default PlayVideo;
