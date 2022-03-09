const mongoose = require('mongoose');

async function connect() {
  try {
   // await mongoose.connect('mongodb://localhost/my_db', {
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.wm6ny.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connect database successfully!!');
  } catch(err) {
    console.log('Connect database failure!!');
  }
}

module.exports = { connect };
