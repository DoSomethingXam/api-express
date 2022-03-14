const express = require('express'),
      morgan = require('morgan'),
      cors = require('cors'),
      db = require('./config/db'),
      path = require('path'),
      swagger = require('./config/swagger'),
      userRouter = require('./routers/user');

db.connect();
const app = express();
const port = process.env.PORT || 3000;
const corsOpt = {
  origin: 'https://learning-express-1.herokuapp.com/'
};

app.disable('x-powered-by');

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(cors(corsOpt));
app.use(swagger);
app.use(express.urlencoded({ extended: true, limit: '2mb' }));
app.use(express.json({limit: '2mb'}));

app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Hello World!',
  });
});

app.use('/user', userRouter);

app.use(function(err, req, res, next) {
  let message;
  let statusCode = err?.code || 500;

  if (err) {
    message = err.message;
  }

  if (err.errors) {
    const key = Object.keys(err.errors);
    if (err.errors[key[0]] && err.errors[key[0]].properties) {
      message = err.errors[key[0]].properties.message;
    }
  }

  res.status(statusCode).json({
    status: 'error',
    message: message
  });
});

app.listen(port, (err) => {
  if (err) {
    console.log(`Error to fire up the server: ${err}`);
    return;
  }
  console.log(`Server start on port ${port}!`)
});