import React from 'react';
import Video from './Video';
import Description from './Description';
import Title from './Title';


const Cinema = props => {


  return(
    <div className="cinema">
      <div className="sideBlock sideBlockLeft">
        <Title
          project={props.project}
        />
      </div>
      <div className="scene">
        <Video
          onVideoLeave={props.onVideoLeave}
          onVideoEnter={props.onVideoEnter}
          project={props.project}
        />
      </div>
      <div className="sideBlock sideBlockRight">
        <Description
          project={props.project}
          onThumbsUp={props.onThumbsUp}
        />

      </div>
    </div>
  )
}

export default Cinema;


{/*
  {props.project.map(project => (
    <Video
      key={project.id}
      project={project}
    />


  ))}

        <Description
          key={project.id}
          project={project}
        />
        */}
