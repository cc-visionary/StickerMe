import React, { Component } from 'react';

import { CharacterService, ImageService } from '../../services';
import { FeatureImage } from '../../components';
import { FEATURES, FEATURE_IMAGE_URL } from '../../utils/constants';
import { getUser } from '../../utils/store';

import selectionBackground from '../../assets/images/create/selection-background.png';
import tape1 from '../../assets/images/create/tape-1.png';
import tape2 from '../../assets/images/create/tape-2.png';
import tape3 from '../../assets/images/create/tape-3.png';
import tape4 from '../../assets/images/create/tape-4.png';
import characterBackground from '../../assets/images/create/character-background.png';

import '../../assets/styles/pages/CreateSticker.css';

export default class CreateSticker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentFeature: FEATURES[0],
      currentFeatures: [],
      allFeatures: [],
      skinColor: null,
      backHair: null,
      frontHair: null,
      sideHair: null,
      extraHair: null,
      eyes: null,
      eyebrows: null,
      nose: null,
      mouth: null,
      blush: null,
      accessories: null,
    };

    this.handleChangeFeature = this.handleChangeFeature.bind(this);
    this.onSelectFeature = this.onSelectFeature.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onAddToCart = this.onAddToCart.bind(this);
  }

  componentDidMount() {
    const { currentFeature } = this.state;

    ImageService.getAllImages().then((res) => {
      const { success, result } = res.data;
      if (success) {
        this.setState({
          allFeatures: result,
          currentFeatures: result.filter((r) => r.imageType === currentFeature),
          skinColor: result.filter((r) => r.imageType === 'Skin Color')[0],
          backHair: result.filter((r) => r.imageType === 'Back Hair')[0],
          frontHair: result.filter((r) => r.imageType === 'Front Hair')[0],
          sideHair: result.filter((r) => r.imageType === 'Side Hair')[0],
          extraHair: result.filter((r) => r.imageType === 'Extra Hair')[0],
          eyes: result.filter((r) => r.imageType === 'Eyes')[0],
          eyebrows: result.filter((r) => r.imageType === 'Eyebrows')[0],
          nose: result.filter((r) => r.imageType === 'Nose')[0],
          mouth: result.filter((r) => r.imageType === 'Mouth')[0],
          blush: result.filter((r) => r.imageType === 'Blush')[0],
          accessories: result.filter((r) => r.imageType === 'Accessories')[0],
        });
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

  onSelectFeature(feature) {
    switch (feature.imageType) {
      case 'Skin Color':
        this.setState({ skinColor: feature });
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

  onSave() {
    const {
      skinColor,
      backHair,
      frontHair,
      sideHair,
      extraHair,
      eyes,
      eyebrows,
      nose,
      mouth,
      blush,
      accessories,
    } = this.state;

    const character = {
      username: getUser().uname,
      skinColor,
      backHair,
      frontHair,
      sideHair,
      extraHair,
      eyes,
      eyebrows,
      nose,
      mouth,
      blush,
      accessories,
    };

    CharacterService.addCharacter(character).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err.response.data);
    });
  }

  onAddToCart() {
    console.log('Adding to Cart');
  }

  render() {
    const {
      currentFeature,
      currentFeatures,
      skinColor,
      backHair,
      frontHair,
      sideHair,
      extraHair,
      eyes,
      eyebrows,
      nose,
      mouth,
      blush,
      accessories,
    } = this.state;

    return (
      <div id="create-sticker-page">
        <div className="sticker-container">
          <div className="title-bar">
            <span className="title-text">Create Sticker</span>
          </div>
          <div className="sticker-inner">
            <div className="frame">
              <svg
                viewBox="0 0 800 800"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <image href={characterBackground} height="600" width="600" x="100" y="100" />
                <image href={backHair && `${FEATURE_IMAGE_URL}/${backHair.fileName}`} height="500" width="500" x="150" y="150" />
                <image href={skinColor && `${FEATURE_IMAGE_URL}/${skinColor.fileName}`} height="500" width="500" x="150" y="150" />
                <image href={blush && `${FEATURE_IMAGE_URL}/${blush.fileName}`} height="500" width="500" x="150" y="155" />
                <image href={frontHair && `${FEATURE_IMAGE_URL}/${frontHair.fileName}`} height="500" width="500" x="150" y="150" />
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
                  </button>
                ))}
              </div>
              <button type="button" onClick={this.onSave}>Save</button>
              <button type="button" onClick={this.onAddToCart}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
