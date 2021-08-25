import React from 'react';
import PropType from 'prop-types';

import { FeatureImage } from '..';
import { FEATURE_IMAGE_URL } from '../../utils/constants';
import ImageUpload from './ImageUpload';

import deleteIcon from '../../assets/images/icons/Delete.png';

import '../../assets/styles/components/Admin/FeatureList.css';

const FeatureList = ({
  currentFeatures,
  imageType,
  onImageDelete,
  onImageUpload,
}) => (
  <div className="admin-feature-list">
    {currentFeatures.map((feature) => (
      <div className="feature-item">
        <FeatureImage
          key={feature.fileName}
          image={`${FEATURE_IMAGE_URL}/${feature.fileName}`}
          name={feature.imageID}
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
);

FeatureList.propTypes = {
  imageType: PropType.string.isRequired,
  currentFeatures: PropType.arrayOf(PropType.object).isRequired,
  onImageDelete: PropType.func.isRequired,
  onImageUpload: PropType.func.isRequired,
};

export default FeatureList;
