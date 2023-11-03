const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://admin:Shaktifa15@cluster0.zmkrfaw.mongodb.net/weatherapp';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));
