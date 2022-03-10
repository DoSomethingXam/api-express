const jwt = require('jsonwebtoken'),
      User = require('../models/user'),
      SECRET_TOKEN = 'secretToken';

let checkLogin = async (req, res, next) => {
  try {
    let tokenBearer = req.headers.authorization;
    if (!tokenBearer) {
      res.status(401).json({
        status: 'error',
        message: 'Not have token...'
      });
    }
    let token = tokenBearer.replace('Bearer ', '');
    let username;
    jwt.verify(token, SECRET_TOKEN, function(err, decoded) {
      if (err) {
        res.status(403).json({
          status: 'error',
          message: err.message
        });
      }
      username = decoded.username;
    });
    let user = await User.findOne({username: username});
    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'The user was not found...'
      });
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = checkLogin;