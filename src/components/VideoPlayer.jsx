import React from "react";
import IMAGES from '../images/images';

function VideoPlayer({source, title}) {
    return (
        <div className="d-flex flex-column justify-content-center text-center pb-3 /*video-player*/">
            <video poster={IMAGES.poster} controls>
              <source src={source} />
            </video>
            <div className="py-1 /*video-title*/">{title}</div>
        </div>
    )
}

export default VideoPlayer;