import React from 'react';
import PropTypes from 'prop-types';

import featureBackground from '../assets/images/feature-background.png';

const FeatureImage = ({ image, name }) => (
  <svg
    className="feature-image"
    viewBox="0 0 100 100"
    height="150px"
    width="150px"
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
      x="15"
      y={name ? '2.5' : '15'}
      height="70"
      width="70"
    />
    {name && (
      <text
        x="50%"
        y="80"
        fontSize="10px"
        dominantBaseline="middle"
        textAnchor="middle"
      >
        {name}
      </text>
    )}
  </svg>
);

FeatureImage.propTypes = {
  image: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.any),
  ]).isRequired,
  name: PropTypes.string,
};

FeatureImage.defaultProps = {
  name: null,
};

export default FeatureImage;
