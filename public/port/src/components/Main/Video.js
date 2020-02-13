import React from 'react';

const Video = props => {

  function onVideoLeave(e) {
    let sideBlockLeft = e.target.parentElement.nextElementSibling;
    let sideBlockRight = e.target.parentElement.previousElementSibling;
    let scene = e.target.parentElement;
    let video = e.target;
    props.onVideoLeave(props.project.id, sideBlockLeft, sideBlockRight, scene, video);
  }
  function onVideoEnter(e) {
    let sideBlockLeft = e.target.parentElement.nextElementSibling;
    let sideBlockRight = e.target.parentElement.previousElementSibling;
    let scene = e.target.parentElement;
    let video = e.target;
    props.onVideoEnter(props.project.id, sideBlockLeft, sideBlockRight, scene, video );
  }



  console.log('props.', props)
  return (
    <video
      className="videos"
      controls
      muted src={props.project.videoURL}
      onMouseEnter={onVideoEnter}
      onMouseLeave={onVideoLeave}
    >
      Video Unavailable
    </video>
  );
}

export default Video;
