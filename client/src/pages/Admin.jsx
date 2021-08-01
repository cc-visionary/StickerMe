import React, { Component } from "react";
import PropTypes from "prop-types";
import FormData from "form-data";
import { toast } from "react-toastify";

import { FeatureList } from "../components/Admin";
import { ImageService, UserService } from "../services";

import selectionBackground from "../assets/images/selection-background.png";

import "../assets/styles/pages/Admin.css";

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

export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentFeature: FEATURES[0],
      currentFeatures: [],
      allFeatures: [],
      // users: [],
    };

    this.handleChangeFeature = this.handleChangeFeature.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.onImageUpload = this.onImageUpload.bind(this);
    this.onImageDelete = this.onImageDelete.bind(this);
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

  handleChangeFeature(e) {
    const { allFeatures } = this.state;

    const currValue = e.target.value;

    this.setState({
      currentFeature: currValue,
      currentFeatures: allFeatures.filter(
        (feature) => feature.imageType === currValue
      ),
    });
  }

  onImageUpload(image) {
    const { currentFeature, allFeatures, currentFeatures } = this.state;
    const formData = new FormData();
    formData.append(currentFeature, image);
    ImageService.uploadImage(formData)
      .then((res) => {
        const { result } = res.data;
        this.setState({
          allFeatures: [...allFeatures, result],
          currentFeatures:
            result.imageType === currentFeature
              ? [...currentFeatures, result]
              : currentFeatures,
        });
      })
      .catch((err) => {
        const { success, error } = err.response.data;
        if (!success) toast.error(error);
      });
  }

  onImageDelete(image) {
    const { allFeatures, currentFeatures } = this.state;
    ImageService.deleteImage(image.fileName)
      .then(() => {
        this.setState({
          allFeatures: allFeatures.filter((f) => f.fileName !== image.fileName),
          currentFeatures: currentFeatures.filter(
            (f) => f.fileName !== image.fileName
          ),
        });
      })
      .catch(() => {
        console.log("Failed to delete the image...");
      });
  }

  render() {
    const { /* users, */ currentFeature, currentFeatures } = this.state;
    // console.log(users);
    return (
      <div id="admin-page">
        <div className="features-container">
          <div className="title-bar">
            <span className="title-text">Sticker Features</span>
          </div>
          <div className="features-inner">
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
            <FeatureList
              currentFeatures={currentFeatures}
              onImageDelete={this.onImageDelete}
              onImageUpload={this.onImageUpload}
              imageType={currentFeature}
            />
          </div>
        </div>
        <input type="button" onClick={this.handleLogout} value="Logout" />
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
