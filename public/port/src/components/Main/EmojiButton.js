import React from 'react';

const EmojiButton = props => {

  function onThumbsUp() {
    props.onThumbsUp(props.project.id);
  }

  return (
    <div>
      <button
        onClick={onThumbsUp}
      >
        {props.project.counts}{'\u2728'}
      </button>
    </div>
  );
}

export default EmojiButton;
