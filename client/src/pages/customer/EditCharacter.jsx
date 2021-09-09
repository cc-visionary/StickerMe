/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';

import { ImageService } from '../../services';
import { FeatureImage } from '../../components';
import { FEATURES, FEATURE_IMAGE_URL } from '../../utils/constants';
import {
  getCharacter,
  getCharacterToken,
  setCharacterLocal,
} from '../../utils/store';

import selectionBackground from '../../assets/images/create/selection-background.png';
import tape1 from '../../assets/images/create/tape-1.png';
import tape2 from '../../assets/images/create/tape-2.png';
import tape3 from '../../assets/images/create/tape-3.png';
import tape4 from '../../assets/images/create/tape-4.png';
import characterBackground from '../../assets/images/create/character-background.png';
import selected from '../../assets/images/icons/Check.png';

import '../../assets/styles/pages/customer/EditCharacter.css';

export default class EditCharacter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentFeature: FEATURES[0],
      currentFeatures: [],
      allFeatures: [],
      skinColor: null,
      backHair: null,
      baseHair: null,
      frontHair: null,
      sideHair: null,
      extraHair: null,
      ear: null,
      eyes: null,
      eyebrows: null,
      nose: null,
      mouth: null,
      blush: null,
      accessories: null,
    };

    this.handleChangeFeature = this.handleChangeFeature.bind(this);
    this.onSelectFeature = this.onSelectFeature.bind(this);
  }

  componentDidMount() {
    const { currentFeature } = this.state;

    ImageService.getAllImages().then((res) => {
      const { success, result } = res.data;
      if (success) {
        if (getCharacterToken()) {
          // load previous character
          const character = getCharacter();
          this.setState({
            allFeatures: result,
            currentFeatures: result.filter((r) => r.imageType === currentFeature),
            skinColor: result.find((r) => r.imageID === character.skinColor),
            baseHair: result.find((r) => r.imageID === character.baseHair),
            backHair: result.find((r) => r.imageID === character.backHair),
            frontHair: result.find((r) => r.imageID === character.frontHair),
            sideHair: result.find((r) => r.imageID === character.sideHair),
            extraHair: result.find((r) => r.imageID === character.extraHair),
            ear: result.find((r) => r.imageID === character.ear),
            eyes: result.find((r) => r.imageID === character.eyes),
            eyebrows: result.find((r) => r.imageID === character.eyebrows),
            nose: result.find((r) => r.imageID === character.nose),
            mouth: result.find((r) => r.imageID === character.mouth),
            blush: result.find((r) => r.imageID === character.blush),
            accessories: result.find((r) => r.imageID === character.accessories),
          });
        } else {
          this.setState({
            allFeatures: result,
            currentFeatures: result.filter((r) => r.imageType === currentFeature),
            skinColor: result.filter((r) => r.imageType === 'Skin Color')[0],
            baseHair: result.filter((r) => r.imageType === 'Base Hair')[0],
            backHair: result.filter((r) => r.imageType === 'Back Hair')[0],
            frontHair: result.filter((r) => r.imageType === 'Front Hair')[0],
            sideHair: result.filter((r) => r.imageType === 'Side Hair')[0],
            extraHair: result.filter((r) => r.imageType === 'Extra Hair')[0],
            ear: result.filter((r) => r.imageType === 'Ears')[0],
            eyes: result.filter((r) => r.imageType === 'Eyes')[0],
            eyebrows: result.filter((r) => r.imageType === 'Eyebrows')[0],
            nose: result.filter((r) => r.imageType === 'Nose')[0],
            mouth: result.filter((r) => r.imageType === 'Mouth')[0],
            blush: result.filter((r) => r.imageType === 'Blush')[0],
            accessories: result.filter((r) => r.imageType === 'Accessories')[0],
          });
        }
      }
    });
  }

  handleChangeFeature(e) {
    const { allFeatures } = this.state;

    const currValue = e.target.value;

    this.setState({
      currentFeature: currValue,
      currentFeatures: allFeatures.filter(
        (feature) => feature.imageType === currValue,
      ),
    });
  }

  handleChangeFeatureButton(feature) {
    const { allFeatures } = this.state;

    this.setState({
      currentFeature: feature,
      currentFeatures: allFeatures.filter(
        (f) => f.imageType === feature,
      ),
    });
  }

  onSelectFeature(feature) {
    switch (feature.imageType) {
      case 'Skin Color':
        this.setState({ skinColor: feature });
        break;
      case 'Base Hair':
        this.setState({ baseHair: feature });
        break;
      case 'Back Hair':
        this.setState({ backHair: feature });
        break;
      case 'Front Hair':
        this.setState({ frontHair: feature });
        break;
      case 'Side Hair':
        this.setState({ sideHair: feature });
        break;
      case 'Extra Hair':
        this.setState({ extraHair: feature });
        break;
      case 'Ears':
        this.setState({ ear: feature });
        break;
      case 'Eyes':
        this.setState({ eyes: feature });
        break;
      case 'Eyebrows':
        this.setState({ eyebrows: feature });
        break;
      case 'Nose':
        this.setState({ nose: feature });
        break;
      case 'Mouth':
        this.setState({ mouth: feature });
        break;
      case 'Blush':
        this.setState({ blush: feature });
        break;
      case 'Accessories':
        this.setState({ accessories: feature });
        break;
      default:
        break;
    }
  }

  onNext() {
    const {
      skinColor,
      baseHair,
      backHair,
      frontHair,
      sideHair,
      extraHair,
      ear,
      eyebrows,
      eyes,
      nose,
      mouth,
      blush,
      accessories,
    } = this.state;

    const { history } = this.props;

    const character = {
      skinColor: skinColor.imageID,
      baseHair: baseHair.imageID,
      backHair: backHair.imageID,
      frontHair: frontHair.imageID,
      sideHair: sideHair.imageID,
      extraHair: extraHair.imageID,
      ear: ear.imageID,
      eyebrows: eyebrows.imageID,
      eyes: eyes.imageID,
      nose: nose.imageID,
      mouth: mouth.imageID,
      blush: blush.imageID,
      accessories: accessories.imageID,
    };

    setCharacterLocal(Math.random().toString(36).substr(2), character);
    history.push('/customer/characters/edit-select-pose');
  }

  isSelected(feature) {
    const {
      currentFeature,
      skinColor,
      baseHair,
      backHair,
      frontHair,
      sideHair,
      extraHair,
      ear,
      eyebrows,
      eyes,
      nose,
      mouth,
      blush,
      accessories,
    } = this.state;

    let selectedFlag = false;

    switch (currentFeature) {
      case 'Skin Color':
        if (skinColor.imageID === feature.imageID) {
          selectedFlag = true;
        }
        break;
      case 'Base Hair':
        if (baseHair.imageID === feature.imageID) {
          selectedFlag = true;
        }
        break;
      case 'Back Hair':
        if (backHair.imageID === feature.imageID) {
          selectedFlag = true;
        }
        break;
      case 'Front Hair':
        if (frontHair.imageID === feature.imageID) {
          selectedFlag = true;
        }
        break;
      case 'Side Hair':
        if (sideHair.imageID === feature.imageID) {
          selectedFlag = true;
        }
        break;
      case 'Extra Hair':
        if (extraHair.imageID === feature.imageID) {
          selectedFlag = true;
        }
        break;
      case 'Ears':
        if (ear.imageID === feature.imageID) {
          selectedFlag = true;
        }
        break;
      case 'Eyes':
        if (eyes.imageID === feature.imageID) {
          selectedFlag = true;
        }
        break;
      case 'Eyebrows':
        if (eyebrows.imageID === feature.imageID) {
          selectedFlag = true;
        }
        break;
      case 'Nose':
        if (nose.imageID === feature.imageID) {
          selectedFlag = true;
        }
        break;
      case 'Mouth':
        if (mouth.imageID === feature.imageID) {
          selectedFlag = true;
        }
        break;
      case 'Blush':
        if (blush.imageID === feature.imageID) {
          selectedFlag = true;
        }
        break;
      case 'Accessories':
        if (accessories.imageID === feature.imageID) {
          selectedFlag = true;
        }
        break;
      default:
        break;
    }
    return selectedFlag;
  }

  render() {
    const {
      currentFeature,
      currentFeatures,
      skinColor,
      baseHair,
      backHair,
      frontHair,
      sideHair,
      extraHair,
      ear,
      eyes,
      eyebrows,
      nose,
      mouth,
      blush,
      accessories,
    } = this.state;

    return (
      <div id="edit-character-page">
        <div className="mobile-view">
          <div className="frame">
            <svg
              viewBox="0 0 800 800"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="500"
              height="500"
            >
              <image href={characterBackground} height="600" width="600" x="100" y="100" />
              <image href={backHair && `${FEATURE_IMAGE_URL}/${backHair.fileName}`} height="500" width="500" x="150" y="150" />
              <image href={skinColor && `${FEATURE_IMAGE_URL}/${skinColor.fileName}`} height="500" width="500" x="150" y="150" />
              <image href={ear && `${FEATURE_IMAGE_URL}/${ear.fileName}`} height="500" width="500" x="150" y="150" />
              <image href={blush && `${FEATURE_IMAGE_URL}/${blush.fileName}`} height="500" width="500" x="150" y="155" />
              <image href={baseHair && `${FEATURE_IMAGE_URL}/${baseHair.fileName}`} height="500" width="500" x="150" y="150" />
              <image href={frontHair && `${FEATURE_IMAGE_URL}/${frontHair.fileName}`} height="500" width="500" x="150" y="140" />
              <image href={sideHair && `${FEATURE_IMAGE_URL}/${sideHair.fileName}`} height="500" width="500" x="150" y="150" />
              <image href={extraHair && `${FEATURE_IMAGE_URL}/${extraHair.fileName}`} height="500" width="500" x="150" y="150" />
              <image href={eyes && `${FEATURE_IMAGE_URL}/${eyes.fileName}`} height="500" width="500" x="150" y="150" />
              <image href={eyebrows && `${FEATURE_IMAGE_URL}/${eyebrows.fileName}`} height="500" width="500" x="150" y="150" />
              <image href={nose && `${FEATURE_IMAGE_URL}/${nose.fileName}`} height="500" width="500" x="150" y="150" />
              <image href={mouth && `${FEATURE_IMAGE_URL}/${mouth.fileName}`} height="500" width="500" x="150" y="175" />
              <image href={accessories && `${FEATURE_IMAGE_URL}/${accessories.fileName}`} height="500" width="500" x="150" y="175" />
              <image href={tape1} height="400" width="400" x="-50" y="425" />
              <image href={tape2} height="300" width="300" x="500" y="25" />
              <image href={tape3} height="300" width="300" x="0" y="0" />
              <image href={tape4} height="300" width="300" x="500" y="475" />
            </svg>
          </div>
          <div className="title-bar">
            {
              FEATURES.map((feature) => (<button type="button" className={currentFeature === feature ? 'active' : ''} onClick={() => this.handleChangeFeatureButton(feature)}>{feature}</button>))
            }
          </div>
          <div className="sticker-inner">
            <div className="feature-list">
              {currentFeatures.map((feature) => (
                <div key={feature.fileName} className="feature-item">
                  <button type="button" onClick={() => this.onSelectFeature(feature)}>
                    <FeatureImage
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
        <div className="desktop-view">
          <div className="title-bar">
            <span className="title-text">Create</span>
          </div>
          <div className="sticker-inner">
            <div className="frame">
              <svg
                viewBox="0 0 800 800"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="500"
                height="500"
              >
                <image href={characterBackground} height="600" width="600" x="100" y="100" />
                <image href={backHair && `${FEATURE_IMAGE_URL}/${backHair.fileName}`} height="500" width="500" x="150" y="150" />
                <image href={skinColor && `${FEATURE_IMAGE_URL}/${skinColor.fileName}`} height="500" width="500" x="150" y="150" />
                <image href={ear && `${FEATURE_IMAGE_URL}/${ear.fileName}`} height="500" width="500" x="150" y="150" />
                <image href={blush && `${FEATURE_IMAGE_URL}/${blush.fileName}`} height="500" width="500" x="150" y="155" />
                <image href={baseHair && `${FEATURE_IMAGE_URL}/${baseHair.fileName}`} height="500" width="500" x="150" y="150" />
                <image href={eyes && `${FEATURE_IMAGE_URL}/${eyes.fileName}`} height="500" width="500" x="150" y="150" />
                <image href={eyebrows && `${FEATURE_IMAGE_URL}/${eyebrows.fileName}`} height="500" width="500" x="150" y="150" />
                <image href={frontHair && `${FEATURE_IMAGE_URL}/${frontHair.fileName}`} height="500" width="500" x="150" y="140" />
                <image href={sideHair && `${FEATURE_IMAGE_URL}/${sideHair.fileName}`} height="500" width="500" x="150" y="150" />
                <image href={extraHair && `${FEATURE_IMAGE_URL}/${extraHair.fileName}`} height="500" width="500" x="150" y="150" />
                <image href={nose && `${FEATURE_IMAGE_URL}/${nose.fileName}`} height="500" width="500" x="150" y="150" />
                <image href={mouth && `${FEATURE_IMAGE_URL}/${mouth.fileName}`} height="500" width="500" x="150" y="175" />
                <image href={accessories && `${FEATURE_IMAGE_URL}/${accessories.fileName}`} height="500" width="500" x="150" y="175" />
                <image href={tape1} height="400" width="400" x="-50" y="425" />
                <image href={tape2} height="300" width="300" x="500" y="25" />
                <image href={tape3} height="300" width="300" x="0" y="0" />
                <image href={tape4} height="300" width="300" x="500" y="475" />
              </svg>
            </div>
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
              <div className="feature-list">
                {currentFeatures.map((feature) => (
                  <button type="button" onClick={() => this.onSelectFeature(feature)}>
                    <FeatureImage
                      key={feature.fileName}
                      image={`${FEATURE_IMAGE_URL}/${feature.fileName}`}
                      name={feature.imageID}
                    />
                    { this.isSelected(feature) && <img className="check-icon" src={selected} alt="Delete Icon" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="buttons">
          <button className="next-button" type="button" onClick={() => this.onNext()}>
            <span />
            Next
          </button>
        </div>
      </div>
    );
  }
}
