import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { ImageService } from '../../services';
import { FeatureImage } from '../../components';
import { getCharacterToken, getPoses, setPosesLocal } from '../../utils/store';
import { FEATURE_IMAGE_URL } from '../../utils/constants';

import selected from '../../assets/images/icons/Check.png';

import '../../assets/styles/pages/customer/EditSelectPose.css';

export default class EditSelectPose extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPoses: [],
      poses: [],
    };
  }

  componentDidMount() {
    ImageService.getImageByType('Skin Color').then((res) => {
      const { success, result } = res.data;
      if (success) this.setState({ poses: result });
    });

    const poses = getPoses();
    if (poses) this.setState({ selectedPoses: poses });
  }

  onSelectFeature(feature) {
    const { selectedPoses } = this.state;
    if (this.isSelected(feature)) {
      this.setState({ selectedPoses: selectedPoses.filter((p) => p !== feature) });
    } else {
      this.setState({ selectedPoses: [...selectedPoses, feature] });
    }
  }

  onBack() {
    const { selectedPoses } = this.state;
    const { history } = this.props;
    setPosesLocal(selectedPoses);
    history.push('/customer/characters/edit-character');
  }

  onNext() {
    const { selectedPoses } = this.state;
    const { history } = this.props;
    setPosesLocal(selectedPoses);
    history.push('/customer/characters/edit-name-description');
  }

  isSelected(feature) {
    const { selectedPoses } = this.state;
    return selectedPoses.includes(feature);
  }

  render() {
    const { poses } = this.state;

    return getCharacterToken() ? (
      <div id="edit-select-pose">
        <div className="container">
          <div className="title-bar">
            <span className="title-text">Pose</span>
          </div>
          <div className="sticker-inner">
            <div className="features">
              <div className="feature-list">
                {poses.map((feature) => (
                  <div className="feature-item">
                    <button type="button" onClick={() => this.onSelectFeature(feature)}>
                      <FeatureImage
                        key={feature.fileName}
                        image={`${FEATURE_IMAGE_URL}/${feature.fileName}`}
                        name={feature.imageID}
                      />
                      { this.isSelected(feature) && <img className="check-icon" src={selected} alt="Delete Icon" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="buttons">
          <button className="back-button" type="button" onClick={() => this.onBack()}>
            <span />
            Back
          </button>
          <button className="next-button" type="button" onClick={() => this.onNext()}>
            <span />
            Next
          </button>
        </div>
      </div>
    ) : <Redirect to="/customer/characters/edit-character" />;
  }
}
