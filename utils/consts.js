const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const ACCESS_DENIED = 403;
const NOT_FOUND = 404;
const CONFLICT = 409;
const ERROR = 500;

const MOVIE_NOT_FOUND_MSG = 'Фильм не найден';
const ANOTHER_USER_CARD_DELETE_MSG = 'Нельзя удалять фильмы других пользователей';
const WRONG_ID_FORMAT_MSG = 'Неверный формат id';
const USER_NOT_FOUND_MSG = 'Пользователь не найден';
const USER_EXISTS_MSG = 'Пользователь уже существует';
const EMAIL_ALREADY_EXISTS_MSG = 'Данный email принадлежит другому пользователю';
const AUTH_REQUIRED_MSG = 'Необходима авторизация';
const INVALID_EMAIL_MSG = 'Некорректный email';
const INVALID_EMAIL_OR_PASSWORD_MSG = 'Неправильные почта или пароль';
const RESOURCE_NOT_FOUND_MSG = 'Ресурс не найден';

function buildMovieCreationErrorMsg(err) {
  return `Переданы неверные данные для создания фильма: ${err.message}`;
}

function buildUserCreationErrorMsg(err) {
  return `Переданы неверные данные для создания пользователя: ${err.message}`;
}

function buildUserEditingErrorMsg(err) {
  return `Переданы неверные данные для редактирования данных пользователя: ${err.message}`;
}

function buildServerErrorMsg(err) {
  return `На сервере произошла ошибка: ${err.message}`;
}

function buildInvalidUrlMsg(value) {
  return `${value} не является корректным URL`;
}

module.exports = {
  BAD_REQUEST,
  UNAUTHORIZED,
  ACCESS_DENIED,
  NOT_FOUND,
  CONFLICT,
  ERROR,

  MOVIE_NOT_FOUND_MSG,
  ANOTHER_USER_CARD_DELETE_MSG,
  WRONG_ID_FORMAT_MSG,
  USER_NOT_FOUND_MSG,
  USER_EXISTS_MSG,
  EMAIL_ALREADY_EXISTS_MSG,
  AUTH_REQUIRED_MSG,
  INVALID_EMAIL_MSG,
  INVALID_EMAIL_OR_PASSWORD_MSG,
  RESOURCE_NOT_FOUND_MSG,

  buildMovieCreationErrorMsg,
  buildUserCreationErrorMsg,
  buildUserEditingErrorMsg,
  buildServerErrorMsg,
  buildInvalidUrlMsg,
};
