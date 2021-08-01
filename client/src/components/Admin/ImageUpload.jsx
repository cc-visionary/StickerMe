import React, { useState } from "react";
import PropType from "prop-types";

const ImageUpload = ({ imageType, onImageUpload }) => {
  const [image, setImage] = useState("");

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="button" onClick={() => onImageUpload(image)}>
        Upload {imageType.replace(/^\w/, (c) => c.toUpperCase())}
      </button>
    </div>
  );
};

ImageUpload.propTypes = {
  imageType: PropType.string.isRequired,
  onImageUpload: PropType.func.isRequired,
};

export default ImageUpload;
