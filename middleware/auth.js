const jwt = require('jsonwebtoken'),
      User = require('../models/user'),
      SECRET_TOKEN = 'secretToken';

let checkLogin = async (req, res, next) => {
  try {
    let tokenBearer = req.headers.authorization;
    if (!tokenBearer) {
      throw {
        code: 401,
        message: 'Not have token...'
      }
    }
    let token = tokenBearer.replace('Bearer ', '');
    let username;
    jwt.verify(token, SECRET_TOKEN, function(err, decoded) {
      if (err) {
        throw {
          code: 403,
          message: err.message
        }
      }
      username = decoded.username;
    });
    let user = await User.findOne({username: username});
    if (!user) {
      throw {
        code: 404,
        message: 'The user was not found...'
      }
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = checkLogin;