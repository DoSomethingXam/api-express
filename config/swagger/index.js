const swaggerJsDoc = require('swagger-jsdoc'),
      express = require('express'),
      router = express.Router(),
      swaggerUI = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'A simple Express Library API',
      contact: {
        name: 'Support API',
        url: 'https://github.com/DoSomethingXam',
        email: 'lhlhai.spkt@gmail.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server'
      },
      {
        url: 'https://learning-express-1.herokuapp.com/',
        description: 'Host server'
      },
          { url: 'https://api-express-i2ff.onrender.com/',
           description: 'Onrender server'
          }
    ],
    tags: [
      {
        name: 'Users',
        description: 'The users managing API'
      },
      {
        name: 'Admins',
        description: 'The admin managing API'
      }
    ]
  },
  apis: ['./swagger/component.js', './swagger/*/*.js']
};
const spec = swaggerJsDoc(options);

const optUI = {
  explorer: true,
}

router.use('/api/v1', swaggerUI.serve, swaggerUI.setup(spec, optUI));

module.exports = router;
