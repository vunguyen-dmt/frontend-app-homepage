import React from 'react';
import './VideoPlayer.scss';

const VideoPlayer = ({
  sources, title, videoPoster
}) => (
  <div className="home-video bg-white cvideo px-5 /*rounded-lg d-flex flex-column justify-content-center video-player*/">
    <video className="rounded-lg object-fit-cover clickable" poster={videoPoster} controls>
      {sources.map((source, index) => (
          <source key={index} src={source} />
        ))}
    </video>
    <div className="font-weight-bold px-3 pt-2 video-title">{title}</div>
  </div>
);

export default VideoPlayer;
