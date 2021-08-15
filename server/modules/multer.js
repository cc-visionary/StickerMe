const multer = require('multer');

require('dotenv').config()

// make sures that the file formats are valid
const fileFilter = (req, file, callback) => {
  if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg') {
    callback(null, false);
    return callback(new Error('Only .png, .jpg, and .jpeg formats are allows!'))
  } else callback(null, true);
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}.${file.mimetype.split('/')[1]}`)
  }
})

const upload = multer({ storage, fileFilter })

module.exports = upload;