import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cinema from './Cinema';
import { thumbsUp } from './../../actions';

const logNodes = (projectId, sideBlockLeft, sideBlockRight, scene, video) => {
  console.log(projectId,'projectid entering')
  console.log(sideBlockRight,'sideBlockRight')
  console.log(scene,'scene')
  console.log(sideBlockLeft,'sideBlockLeft')
}

class Main extends Component {
  constructor(props) {
    super(props);
    console.log(props,' from main');
  }

  onThumbsUp = (projectId) => {
    console.log(projectId)
    this.props.dispatch(thumbsUp(projectId));
  }

  onVideoLeave = (projectId, sideBlockLeft, sideBlockRight, scene, video) => {

    video.pause();
    logNodes(projectId, sideBlockLeft, sideBlockRight, scene, video);

    let rotateAmount = 0;
    sideBlockLeft.style.transform = `rotateY(${rotateAmount}deg)`;

    sideBlockRight.style.transform = `rotateY(${rotateAmount}deg)`;



    let pushback = 0;
    scene.style.transform = `translateZ(-${pushback}px)`;

    sideBlockLeft.style.marginLeft = '0px';
    sideBlockRight.style.marginRight = '0px';
  }



  onVideoEnter = (projectId, sideBlockLeft, sideBlockRight, scene, video) => {
    logNodes(projectId, sideBlockLeft, sideBlockRight, scene, video);

    video.play();
    let rotateAmount = 50;
    sideBlockLeft.style.transform = `rotateY(-${rotateAmount}deg)`;

    sideBlockRight.style.transform = `rotateY(${rotateAmount}deg)`

    let length = 200;
    let pushback = length *
        (Math.sin(rotateAmount * Math.PI / 180) / Math.sin(90 * Math.PI / 180))
    console.log(pushback)
    scene.style.transform = `translateZ(-${pushback}px)`;

    sideBlockLeft.style.marginLeft = '-70px';
    sideBlockRight.style.marginRight = '-70px';

  }

  render () {
    console.log(this.props,'after')
    console.log(this.state,'after state')
    return(
      <div>
        <div className="bar"></div>
        <div>{this.props.projectsLength > 0 ? <div>{this.props.projects.map(project =>
          <div key={project.id}>
            <Cinema
              key={project.id}
              project={project}
              projectsLength={this.props.projectsLength}
              onVideoLeave={this.onVideoLeave}
              onVideoEnter={this.onVideoEnter}
              onThumbsUp={this.onThumbsUp}
            />
            <div
              className="bar"></div>
          </div>
        )}

        </div> : ''}</div>
      </div>

    )
  }
}

function mapStateToProps(state) {

  const { projects, projectsLength } = state.page;

  return {
    projects:projects,
    projectsLength: projectsLength,
  };
}


export default connect(mapStateToProps)(Main)


// {props.projects.map(project => (
//   <Cinema
//     key={project.id}
//     project={project}
//   />
// ))}
