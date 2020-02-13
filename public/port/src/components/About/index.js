import React, { Component } from 'react';
import { connect } from 'react-redux';

class About extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    return(
        <div>About component</div>
    )
  }
}

function mapStateToProps(state) {
  return {
  };
}


export default connect(mapStateToProps)(About)
