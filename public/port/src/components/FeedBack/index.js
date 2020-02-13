import React, { Component } from 'react';
import { connect } from 'react-redux';

class FeedBack extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    return(
        <div>FeedBack component</div>
    )
  }
}

function mapStateToProps(state) {
  return {
  };
}


export default connect(mapStateToProps)(FeedBack)
