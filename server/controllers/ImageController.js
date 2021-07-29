// import module from `../models/database.js`
const db = require('../models/database.js');

// import ImageSchema from `../models/ImageModel.js`
const Image = require('../models/ImageModel');

const fileSizeFormatter = require('../helpers/fileSizeFormatter');

const ImageController = {
  insertImage: async (req, res) => {
    try {
      const file = req.files[0]
      console.log(file)
      const img = new Image({
        fileName: file.originalname,
        filePath: file.path,
        fileType: file.mimetype,
        fileSize: fileSizeFormatter(file.size, 2),
        imageType: file.fieldname,
      })
      await img.save();
      res.status(201).send('Image was uploaded successfully!')
    } catch (error) {
      console.log(error)
      // res.status(400).send(error.message);
    }
  },
  getAllImages: async (req, res) => {
    try {
      const files = await Image.find();
      res.status(200).send(files);
    } catch(error) {
      console.log(error)
      // res.status(400).send(error.message);
    }
  }
};
/*
    exports the object `ImageController` (defined above)
    when another script exports from this file
*/
module.exports = ImageController;