import React, { Component } from "react";
import PropTypes from "prop-types";

import "../assets/styles/pages/Admin.css";

// eslint-disable-next-line no-unused-vars
import { FeatureList, ImageUpload } from "../components";
import { ImageService, UserService } from "../services";

const FEATURES = [
  "Skin Color",
  "Back Hair",
  "Front Hair",
  "Side Hair",
  "Extra Hair",
  "Eyes",
  "Eyebrows",
  "Nose",
  "Mouth",
  "Blush",
  "Accessories",
];

const FEATURES_PATH = "http://localhost:3000/uploads";

export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentFeature: FEATURES[0],
      currentFeatures: [],
      allFeatures: [],
      // users: [],
    };
  }

  componentDidMount() {
    const { currentFeature } = this.state;
    ImageService.getAllImages().then((res) => {
      const { success, result } = res.data;
      if (success) {
        this.setState({
          allFeatures: result,
          currentFeatures: result.filter((r) => r.imageType === currentFeature),
        });
      }
    });
    // UserService.getAllUsers().then((res) => {
    //   const { success, result } = res.data;
    //   if (success) {
    //     this.setState({ users: result });
    //   } else {
    //     console.log("Failed to get the Users from the Database");
    //   }
    // });
  }

  handleLogout() {
    const { history } = this.props;
    UserService.logout().then(() => {
      history.push("/login");
    });
  }

  handleChangeFeature(currValue) {
    const { allFeatures } = this.state;
    this.setState({
      currentFeature: currValue,
      currentFeatures: allFeatures.filter(
        (feature) => feature.imageType === currValue
      ),
    });
  }

  addToFeatures(feature) {
    const { currentFeature, allFeatures, currentFeatures } = this.state;
    this.setState({
      allFeatures: [...allFeatures, feature],
      currentFeatures:
        feature.imageType === currentFeature
          ? [...currentFeatures, feature]
          : currentFeatures,
    });
  }

  render() {
    const { /* users, */ currentFeature, currentFeatures } = this.state;
    // console.log(users);
    return (
      <div id="admin-page">
        <div className="admin-container">
          <div className="title-bar">Sticker Features</div>

          <select
            value={currentFeature}
            onChange={(e) => this.handleChangeFeature(e.target.value)}
          >
            {FEATURES.map((feature) => (
              <option>{feature}</option>
            ))}
          </select>
          {currentFeatures.map((feature) => (
            <div>
              <svg
                viewBox="0 0 100 100"
                height="100"
                width="100"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <image
                  className="background-shape"
                  href="../assets/images/feature-background.png"
                  height="100"
                  width="100"
                />
                <image
                  className="feature-image"
                  href={`${FEATURES_PATH}/${feature.fileName}`}
                  height="75"
                  width="75"
                />
              </svg>
            </div>
          ))}
          <ImageUpload
            addToFeatures={(e) => this.addToFeatures(e)}
            imageType={currentFeature}
          />
          <input
            type="button"
            onClick={() => this.handleLogout()}
            value="Logout"
          />
        </div>
      </div>
    );
  }
}

Admin.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
};

Admin.defaultProps = {
  history: null,
};
