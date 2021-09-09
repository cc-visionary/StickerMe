/* Contains the functions to requests to URL Paths in relation to the `images` collection */

import axios from 'axios';

import { IMAGE_API_BASE_URL } from '../utils/constants';

const ImageService = {
  getAllImages: async () => axios.get(IMAGE_API_BASE_URL),
  getImageByType: async (imageType) => axios.get(`${IMAGE_API_BASE_URL}/type/${imageType}`),
  getImageByID: async (id) => axios.get(`${IMAGE_API_BASE_URL}/id/${id}`),
  uploadImage: async (image) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    return axios.post(`${IMAGE_API_BASE_URL}/upload`, image, config);
  },
  deleteImage: async (filePath) => axios.delete(`${IMAGE_API_BASE_URL}/${filePath}`),
};

export default ImageService;
