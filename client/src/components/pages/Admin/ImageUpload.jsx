import React, { useState } from "react";
import PropType from "prop-types";

import FormData from "form-data";

import { ImageService } from "../../../services";

const ImageUpload = ({ imageType }) => {
  const [image, setImage] = useState("");

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append(imageType, image);
    const response = await ImageService.uploadImage(formData);
    if (response.status === 201) {
      const { id } = response.headers;

      console.log(id);
    } else {
      console.log(response);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="button" onClick={uploadImage}>
        Upload {imageType.replace(/^\w/, (c) => c.toUpperCase())}
      </button>
    </div>
  );
};

ImageUpload.propTypes = {
  imageType: PropType.string.isRequired,
};

export default ImageUpload;
