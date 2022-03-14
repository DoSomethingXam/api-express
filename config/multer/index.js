const multer = require('multer'),
      fs = require('fs'),
      moment = require('moment'),
      path = require('path');

let diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dirName = 'public/avatars';
    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName);
    }
    cb(null, dirName);
  },
  filename: (req, file, cb) => {
    let user = req.user,
        name = file.fieldname,
        date = moment().format('YYMMDD_HHmmss'),
        extname = path.extname(file.originalname);

    cb(null, `${user.name.toLowerCase()}_${name}_${date}${extname}`);
  }
});

module.exports = {
  storage: diskStorage,
  limits: {
    fileSize: 5000000
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.toLowerCase().match(/\.(png|jpg|jpeg)$/)) {
      return cb(new Error('Your image not match with extension: jpg|jpeg|png'), false);
    }
    cb(null, true);
  }
}