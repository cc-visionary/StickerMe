/* Contains the functions to requests to URL Paths in relation to the `images` collection */

import axios from "axios";

const IMAGE_API_BASE_URL = "http://localhost:3000/api/images";

const ImageService = {
  getAllImages: async () => axios.get(IMAGE_API_BASE_URL),
  getImageByType: async (imageType) =>
    axios.get(`${IMAGE_API_BASE_URL}/${imageType}`),
  uploadImage: async (image) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    return axios.post(`${IMAGE_API_BASE_URL}/upload`, image, config);
  },
  deleteImage: async (id, filePath) =>
    axios.delete(IMAGE_API_BASE_URL, { _id: id, filePath }),
};

export default ImageService;
