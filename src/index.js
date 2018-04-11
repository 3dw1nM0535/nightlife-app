"use strict";

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bar = require("./routes/bar/bar");

var _bar2 = _interopRequireDefault(_bar);

var _user = require("./routes/user/user");

var _user2 = _interopRequireDefault(_user);

var _auth = require("./routes/user/auth");

var _auth2 = _interopRequireDefault(_auth);

var _private_keys = require("./config/private_keys");

var _private_keys2 = _interopRequireDefault(_private_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// config.plugins.push(new webpack.HotModuleReplacementPlugin());

////////////////////////
//Connect to database //
////////////////////////


///////////////////////////////////
//Webpack HRM & Compiler modules //
///////////////////////////////////

// import webpack from "webpack";
// import webpackHotMiddleware from "webpack-hot-middleware";
// import webpackDevMiddleware from "webpack-dev-middleware";
// import config from "../webpack.config";

//////////////////
//Route modules //
//////////////////
_mongoose2.default.connect(_private_keys2.default.MONGO_URI);

//////////////////////////////////////////////
//Certificate options for HTTPS development //
//////////////////////////////////////////////
/*const certOptions = {
  pfx: fs.readFileSync(path.resolve("config/localhost.pfx")),
  passphrase: privateEnv.PASSPHRASE,
};*/

////////////////////////
//Init express module //
////////////////////////
///////////////////
//Server modules //
///////////////////
var app = (0, _express2.default)();

///////////////////////////
//Static file middleware //
///////////////////////////
app.use(_express2.default.static(_path2.default.resolve("build")));

////////////////////////
//Parse req-body data //
////////////////////////
app.use(_bodyParser2.default.json());

////////////////
//Config PORT //
////////////////
var port = process.env.PORT;

///////////////////////////
//Webpack compiler setup //
///////////////////////////
// const compiler = webpack(config);

///////////////////////////
//Webpack HRM Middleware //
///////////////////////////
// app.use(webpackHotMiddleware(compiler));

///////////////////////////
//Webpack dev Middleware //
///////////////////////////

/*
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  hot: true,
  historyApiFallback: true,
  publicPath: config.output.publicPath,
}));
*/

//////////////////////
//Any route handler //
//////////////////////
app.get("*", function (req, res) {
  res.sendFile(_path2.default.resolve("./build", "index.html"));
});

/////////////////
//Mount routes //
/////////////////
app.use("/api/bars", _bar2.default);
app.use("/api/user", _user2.default);
app.use("/api/auth", _auth2.default);

////////////////////////////
//Init server over HTTPS //
////////////////////////////
var server = _http2.default.createServer(app);

///////////////////////////
//Listen for connections //
///////////////////////////
server.listen(port);
//# sourceMappingURL=index.js.map