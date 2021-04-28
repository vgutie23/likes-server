"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _passportLocal = require("passport-local");

_passport["default"].use(new _passportLocal.Strategy(function (username, password, done) {
  if (username === process.env.API_USERNAME && password === process.env.API_PASSWORD) {
    return done(null, username);
  }

  return done(null, false);
}));

var _default = _passport["default"];
exports["default"] = _default;