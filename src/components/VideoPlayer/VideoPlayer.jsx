import React from 'react';
import './VideoPlayer.scss';

const VideoPlayer = ({
  source, title, videoPoster
}) => (
  <div className="home-video bg-white rounded-lg cvideo d-flex flex-column justify-content-center pb-3 /*video-player*/">
    <video className="rounded-lg object-fit-cover clickable" poster={videoPoster} controls>
      <source src={source} />
    </video>
    <div className="font-weight-bold px-3 pt-2 /*video-title*/">{title}</div>
  </div>
);

export default VideoPlayer;
