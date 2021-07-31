// import module `mongoose`
const mongoose = require('mongoose');

const { Schema } = mongoose;

// defines the schema for collection `images`
const ImageSchema = new Schema({
  fileName: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
    required: true,
  },
  fileSize: {
    type: String,
    required: true,
  },
  imageType: {
    type: String,
    require: true,
  },
  price: {
    type: Schema.Types.Decimal128,
    default: 0,
  }
}, { timestamps: true });

/*
  exports a mongoose.model object based on `ImageSchema` (defined above)
  when another script exports from this file
  This model executes CRUD operations
  to collection `images` -> plural of the argument `Image`
*/
module.exports = mongoose.model('Image', ImageSchema);