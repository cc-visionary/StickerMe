import React, { Component } from 'react';

import selectionBackground from '../../assets/images/create/selection-background.png';

import '../../assets/styles/pages/CreateSticker.css';

import { FEATURES } from '../../utils/constants';

export default class CreateSticker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentFeature: FEATURES[0],
    };
  }

  render() {
    const { currentFeature } = this.state;

    return (
      <div id="create-sticker-page">
        <div className="sticker-container">
          <div className="title-bar">
            <span className="title-text">Create Sticker</span>
          </div>
          <div className="sitcker-inner">
            <div className="frame">FRAME</div>
            <div className="features">
              <div className="features-selection">
                <select
                  value={currentFeature}
                  onChange={this.handleChangeFeature}
                >
                  {FEATURES.map((feature) => (
                    <option key={feature} value={feature}>
                      {feature}
                    </option>
                  ))}
                </select>
                <img src={selectionBackground} alt="Selection Background" />
              </div>
              FEATURES
            </div>
          </div>
        </div>
      </div>
    );
  }
}
