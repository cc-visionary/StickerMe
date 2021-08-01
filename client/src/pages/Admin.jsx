import React, { Component } from "react";
import PropTypes from "prop-types";

import "../assets/styles/pages/Admin.css";

// eslint-disable-next-line no-unused-vars
import { FeatureList, ImageUpload } from "../components";
import { ImageService, UserService } from "../services";

const features = [
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
      currentFeature: features[0],
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

  render() {
    const { /* users, */ currentFeature, currentFeatures } = this.state;
    // console.log(users);
    return (
      <div id="admin-page">
        <h1>Admin Page Content</h1>
        <select
          value={currentFeature}
          onChange={(e) => this.handleChangeFeature(e.target.value)}
        >
          {features.map((feature) => (
            <option>{feature}</option>
          ))}
        </select>
        {currentFeatures.map((feature) => (
          <div>{feature.fileName}</div>
        ))}
        <ImageUpload imageType={currentFeature} />
        <input
          type="button"
          onClick={() => this.handleLogout()}
          value="Logout"
        />
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
