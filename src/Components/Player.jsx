// YouTubePlayer.js
import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';

const Player = ({ videoUrl }) => {
  const [videoId, setVideoId] = useState('');

  useEffect(() => {
    const fetchVideoId = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos`,
          {
            params: {
              part: 'snippet',
              type: 'video',
              q: videoUrl,
              key: 'YOUR_YOUTUBE_API_KEY',
            },
          }
        );

        const firstVideo = response.data.items[0];
        if (firstVideo) {
          setVideoId(firstVideo.id.videoId);
        }
      } catch (error) {
        console.error('Error fetching video information:', error);
      }
    };

    fetchVideoId();
  }, [videoUrl]);

  return (
    <div>
      {videoId && (
        <YouTube
          videoId={videoId}
          opts={{
            height: '390',
            width: '640',
            playerVars: {
              autoplay: 1,
            },
          }}
        />
      )}
    </div>
  );
};

export default Player;
