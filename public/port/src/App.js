import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect } from 'react-redux';
import Navigation from './components/Navigation';
import Main from './components/Main';
import FeedBack from './components/FeedBack';
import About from './components/About';
import Menu from './components/Menu';

import {BrowserRouter , Switch, Route} from 'react-router-dom';

import {
  fetchProjects,
} from './actions';



const mockProjects = [
  {
      id: 1,
      title: 'Wave Generator',
      description: 'description',
      link: '/whatever',
      videoURL: './assets/vids/2d3d_0x.mp4',
  },
  {
      id: 2,
      title: 'Alt Tage Generator',
      description: 'temp',
      link: '/whatever',
      videoURL: './assets/vids/altgenerator_0x.mp4',
  },
]



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mockProjects: mockProjects,
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchProjects());
    console.log('dispatched?')
  }


  render() {
    console.log(this.props,'from app js');
    console.log(this.states,'from app js');

    return(
      <BrowserRouter>

        {/* <Switch> doesn't work */}
        <div className="container">
          <div className="item-a header">
            <div className="portfolioLogo"></div>
            <div className="headerLogo"></div>
            <Navigation />
          </div>
          <div className="item-c side middle">
            <Menu projects={this.props.projects}/>
          </div>

          <div className="item-b main middle">
            <Route exact path="/" component={Main} />
            <Route exact path="/about" component={About} />
            <Route exact path="/feedback" component={FeedBack} />
          </div>
          <div className="item-d footer">


          </div>
        </div>


      </BrowserRouter>
    )
  }
}

function mapStateToProps(state) {
  console.log(state, 'from reducer')
  const { projects, projectsLength } = state.page;

  return {
    projects: projects,
    projectsLength: projectsLength,
  };
}

export default connect(mapStateToProps)(App);
