import React from "react";
import PropType from "prop-types";

import { FeatureImage } from "..";
// eslint-disable-next-line import/no-cycle
import { ImageUpload } from ".";

import deleteIcon from "../../assets/images/icons/Delete.png";

import "../../assets/styles/components/Admin/FeatureList.css";

const FEATURES_PATH = "http://localhost:3000/uploads";

const FeatureList = ({
  featureName,
  currentFeatures,
  imageType,
  onImageDelete,
  onImageUpload,
}) => (
  <div>
    <h1>{featureName}</h1>
    <div className="admin-feature-list">
      {currentFeatures.map((feature) => (
        <div className="feature-item">
          <FeatureImage
            key={feature.fileName}
            image={`${FEATURES_PATH}/${feature.fileName}`}
          />
          <button
            className="delete-button"
            type="button"
            onClick={() => onImageDelete(feature)}
          >
            <img src={deleteIcon} alt="Delete Icon" />
          </button>
        </div>
      ))}
      <div className="feature-item">
        <ImageUpload onImageUpload={onImageUpload} imageType={imageType} />
      </div>
    </div>
  </div>
);

FeatureList.propTypes = {
  featureName: PropType.string.isRequired,
  imageType: PropType.string.isRequired,
  currentFeatures: PropType.arrayOf(PropType.object).isRequired,
  onImageDelete: PropType.func.isRequired,
  onImageUpload: PropType.func.isRequired,
};

export default FeatureList;