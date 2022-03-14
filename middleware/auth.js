const jwt = require('jsonwebtoken'),
      User = require('../models/user'),
      SECRET_TOKEN = 'secretToken';

let checkLogin = async (req, res, next) => {
  try {
    let tokenBearer = req.headers.authorization;
    if (!tokenBearer) {
      const err = new Error('Not have token...');
      err.code = 401;
      throw err;
    }
    let token = tokenBearer.replace('Bearer ', '');
    let username;
    jwt.verify(token, SECRET_TOKEN, function(err, decoded) {
      if (err) {
        const error = new Error(err.message)
        error.code = 403
        throw error;
      }
      username = decoded.username;
    });
    let user = await User.findOne({username: username});
    if (!user) {
      const err = new Error('The user was not found...');
      err.code = 404;
      throw err;
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = checkLogin;