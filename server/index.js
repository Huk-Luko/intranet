const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
/* const users = require('./routes/users'); */
const auth = require('./routes/auth');
const mongoose = require('mongoose');
const config = require('config');
const Joi = require('joi');

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}; 

mongoose.connect('mongodb://renami:renami2020@161.35.197.133:27017/renami', {
    authSource: 'admin',
    readPreference: 'primary',
    ssl: false,
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => console.log('Connected to mongoDB'))
    .catch(err => console.log('Connection not successful', err.message));

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
/* app.use('/api/users', users); */
app.use('/api/auth',auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));