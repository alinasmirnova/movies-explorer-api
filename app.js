const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
require('dotenv').config();
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/rateLimit');

const { PORT = 3000, DB, NODE_ENV } = process.env;

const app = express();

const whitelist = ['http://localhost:3000', 'http://localhost:3001', 'http://asmirnova.movies.api.nomoredomains.rocks', 'https://localhost:3000', 'https://asmirnova.movies.api.nomoredomains.rocks', undefined];
app.use(cors({
  origin: function checkOrigin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  credentials: true,
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(helmet());
app.use(limiter);

app.use(require('./routes'));

mongoose.connect(NODE_ENV === 'production' ? DB : 'mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
});

app.use(errorLogger);

app.use(errors());

app.use(require('./middlewares/errorWrapper'));

app.listen(PORT, () => { });
