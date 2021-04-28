"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("./helpers/dotenv");

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _helmet = _interopRequireDefault(require("helmet"));

var _logger = _interopRequireDefault(require("./helpers/logger"));

var _routes = _interopRequireDefault(require("./routes"));

var _errors = require("./helpers/errors");

var _auth = _interopRequireDefault(require("./helpers/auth"));

var port = parseInt(process.env.PORT, 10) || 3000;
var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _morgan["default"])(process.env.MORGAN_LOG));
app.use((0, _cors["default"])({
  origin: process.env.ORIGIN
}));
app.use((0, _helmet["default"])());
app.use(_auth["default"].initialize());
app.use(_routes["default"]);
app.use(_errors.notFound);
app.use(_errors.errorHandler);
app.listen(port, function () {
  return _logger["default"].success("Application started at http://localhost:".concat(process.env.PORT));
});