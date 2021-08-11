import React, { Component } from 'react';

export default class CreateSticker extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div id="create-sticker-page">
        <div className="sticker-container">
          <div className="title-bar">
            <span className="title-text">Create Sticker</span>
          </div>

        </div>
      </div>
    );
  }
}
