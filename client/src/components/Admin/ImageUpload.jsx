import React from "react";
import PropType from "prop-types";

import { FeatureImage } from "..";

import plusSign from "../../assets/images/icons/PlusSign.png";

const ImageUpload = ({ imageType, onImageUpload }) => (
  <div id="image-upload">
    <label htmlFor={imageType}>
      <FeatureImage image={plusSign} />
    </label>
    <input
      id={imageType}
      name={imageType}
      type="file"
      accept="image/*"
      onChange={(e) => onImageUpload(e.target.files[0])}
      hidden
    />
  </div>
);

ImageUpload.propTypes = {
  imageType: PropType.string.isRequired,
  onImageUpload: PropType.func.isRequired,
};

export default ImageUpload;
