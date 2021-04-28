"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _logger = _interopRequireDefault(require("../helpers/logger"));

var router = (0, _express.Router)();
router.get('/', function (req, res) {
  _logger["default"].info('Inside the root path');

  var title = process.env.TITLE || 'Server';
  res.send({
    msg: title
  });
});
var _default = router;
exports["default"] = _default;