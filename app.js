const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
require('dotenv').config();
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { ERROR } = require('./utils/consts');
const { limiter } = require('./middlewares/rateLimit');

const { PORT = 3000, DB, NODE_ENV } = process.env;

const app = express();

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

app.use((err, req, res, next) => {
  const { statusCode = ERROR, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === ERROR
        ? `На сервере произошла ошибка: ${message}`
        : message,
    });
  next();
});

app.listen(PORT, () => { });
