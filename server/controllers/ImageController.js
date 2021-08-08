// import module from `../models/database.js`
const db = require("../models/database.js");
const fs = require("fs");

// import ImageSchema from `../models/ImageModel.js`
const Image = require("../models/ImageModel");

const fileSizeFormatter = require("../helpers/fileSizeFormatter");

const defaultCallback = require("../helpers/defaultCallback");

const ImageController = {
  // inserts an image info to the database
  insertImage: async (req, res) => {
    const file = req.files[0];
    const image = {
      fileName: file.path.split("\\")[1],
      filePath: file.path,
      fileType: file.mimetype,
      fileSize: fileSizeFormatter(file.size, 2),
      imageID: file.originalname.split(".")[0],
      imageType: file.fieldname,
    };
    db.insertOne(Image, image, (result) => {
      if (result.success) {
        res.status(201).send({ success: true, result: image });
      } else {
        if(result.error.code === 11000) {
          res.status(400).send({ success: false, error: "Image ID already exists..." });
        } else {
          res.status(400).send({ success: false, error: result.error.message });
        }
      }
    });
  },
  // returns all the images from the database
  getAllImages: async (req, res) => {
    db.findMany(Image, {}, (result) => defaultCallback(res, result));
  },
  // returns all the images of a certain type from the database
  getImagesByType: async (req, res) => {
    const { imageType } = req.params;
    db.findMany(Image, { imageType }, (result) => defaultCallback(res, result));
  },
  deleteImage: async (req, res) => {
    const { fileName } = req.params;
    try {
      db.deleteOne(Image, { fileName }, (result) => {
        fs.unlinkSync(`uploads/${fileName}`);
        defaultCallback(res, result);
      });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  },
};
/*
    exports the object `ImageController` (defined above)
    when another script exports from this file
*/
module.exports = ImageController;
