const express = require('express'),
      bcrypt = require('bcrypt'),
      _ = require('lodash'),
      moment = require('moment'),
      multer = require('multer'),
      fs = require('fs'),
      path = require('path'),
      User = require('../models/user'),
      auth = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res, next) => {
  let query = _.pickBy(req.query, _.identity);
  let pageOptions = {
    page: parseInt(query.page) || 1,
    limit: parseInt(query.limit) || 10
  }
  let objQuery = {};
  Object.keys(query)
        .forEach(key => objQuery[key] = {$regex: query[key]});
  try {
    const users = await User.find(objQuery)
                            .limit(pageOptions.limit)
                            .skip(pageOptions.limit * (pageOptions.page - 1));
    res.json({
      status: 'success',
      message: 'Get list successful',
      data: users
    });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', auth, async (req, res, next) => {
  let user = req.user;
  let reqId = req.params.id;
  if (user.id != reqId) {
    throw new Error('Something was wrong...');
  }
  try {
    res.json({
      status: 'success',
      message: 'Get detail successful',
      data: user
    });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  let objBody = _.pickBy(req.body, _.identity);
  const userExist = await User.findOne({
    username: objBody.username
  });

  try {
    if (userExist) {
      throw new Error('User has exist');
    }

    let user = await new User(objBody);
    await user.save();
    res.json({
      status: 'success',
      message: 'Create success',
      data: user
    });
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', auth, async (req, res, next) => {
  let id = req.params.id;
  let user = req.user;
  if (user.id != id) {
    throw new Error('Something was wrong...');
  }

  let objBody = _.pickBy(req.body, _.identity);
  objBody.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');

  let keys = Object.keys(objBody);
  try {
    keys.forEach(key => {
      user[key] = objBody[key];
    });
    let result = await user.save();
    res.json({
      status: 'success',
      message: 'Update success',
      data: result
    });
  } catch(err) {
    next(err);
  }
});

router.delete('/all', async (req, res, next) => {
  try {
    await User.deleteMany();
    res.json({
      status: 'success',
      message: 'Delete all success'
    });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  let id = req.params.id;

  try {
    await User.deleteOne({}, {_id: id});
    res.json({
      status: 'success',
      message: 'Delete success'
    });
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  let objBody = _.pickBy(req.body, _.identity);
  const user = await User.findOne({username: objBody.username});

  try {
    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'The user was not found...'
      });
    }

    let hashPass = await bcrypt.compare(objBody.password, user.password);
    if (!hashPass) {
      throw new Error('Password was wrong...');
    }

    let token = user.createToken();
    res.json({
      status: 'success',
      message: `Login success`,
      token: token,
      data: user
    });
  } catch (err) {
    next(err);
  }
});

const upload = multer({
  storage: multer.diskStorage({
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
  }),
  limits: {
    fileSize: 3000000
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.toLowerCase().match(/\.(png|jpg|jpeg)$/)) {
      return cb(new Error('Your image not match with extension: jpg|jpeg|png'), false);
    }
    cb(null, true);
  }
}).single('avatar');

router.post('/avatar', auth, (req, res) => {
  upload(req, res, async function(err) {
    try {
      if (!req.file) {
        throw new Error('Please select an image...');
      } else if (err instanceof multer.MulterError) {
        throw err;
      } else if (err) {
        throw err;
      }
      let host = req.get('host');
      let user = req.user;
      if (user.avatar !== '') {
        let filename = `public/avatars/${user.avatar}`;
        fs.unlinkSync(filename);
      }
      user['avatar'] = req.file.filename;
      let result = await user.save();
      let newResult = {
        ...result.toJSON(),
        full_url_avatar: `${host}/avatars/${result.avatar}`
      };
      res.json({
        status: 'success',
        message: 'The avatar was uploaded',
        data: newResult
      });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: err.message
      });
    }
  });
});

module.exports = router;