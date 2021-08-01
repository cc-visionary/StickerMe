import React from "react";
import PropTypes from "prop-types";

import featureBackground from "../assets/images/feature-background.png";

const FeatureImage = ({ image }) => (
  <svg
    className="feature-image"
    viewBox="0 0 100 100"
    height="150"
    width="150"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <image
      className="background-shape"
      href={featureBackground}
      height="100%"
      width="100%"
    />
    <image
      className="feature-image"
      href={image}
      x="12.5"
      y="12.5"
      height="75"
      width="75"
    />
  </svg>
);

FeatureImage.propTypes = {
  image: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.any),
  ]).isRequired,
};

export default FeatureImage;
