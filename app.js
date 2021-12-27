const express = require('express');
require('dotenv').config();

const { PORT = 3000 } = process.env;

const app = express();

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на порту ${PORT}`);
});
