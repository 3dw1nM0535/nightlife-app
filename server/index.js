///////////////////
//Server modules //
///////////////////
import path from "path";
import express from "express";
import fs from "fs";
import https from "https";
import bodyParser from "body-parser";
import mongoose from "mongoose";

///////////////////////////////////
//Webpack HRM & Compiler modules //
///////////////////////////////////

import webpack from "webpack";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackDevMiddleware from "webpack-dev-middleware";
import config from "../webpack.config";

import privateEnv from "../config/private_keys";

//////////////////
//Route modules //
//////////////////
import bar from "./routes/bar/bar";
import user from "./routes/user/user";
import auth from "./routes/user/auth";

config.plugins.push(new webpack.HotModuleReplacementPlugin());

////////////////////////
//Connect to database //
////////////////////////
mongoose.connect(privateEnv.MONGO_URI);

//////////////////////////////////////////////
//Certificate options for HTTPS development //
//////////////////////////////////////////////
const certOptions = {
  pfx: fs.readFileSync(path.resolve("config/localhost.pfx")),
  passphrase: privateEnv.PASSPHRASE,
};

////////////////////////
//Init express module //
////////////////////////
const app = express();

///////////////////////////
//Static file middleware //
///////////////////////////
app.use(express.static(path.resolve(__dirname, "public")));

////////////////////////
//Parse req-body data //
////////////////////////
app.use(bodyParser.json());

////////////////
//Config PORT //
////////////////
const port = privateEnv.PORT;

///////////////////////////
//Webpack compiler setup //
///////////////////////////
const compiler = webpack(config);

///////////////////////////
//Webpack HRM Middleware //
///////////////////////////
app.use(webpackHotMiddleware(compiler));

///////////////////////////
//Webpack dev Middleware //
///////////////////////////
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  hot: true,
  historyApiFallback: true,
  publicPath: config.output.publicPath,
}));

//////////////////////
//Any route handler //
//////////////////////
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

/////////////////
//Mount routes //
/////////////////
app.use("/api/bars", bar);
app.use("/api/user", user);
app.use("/api/auth", auth);

////////////////////////////
//Init server onver HTTPS //
////////////////////////////
const server = https.createServer(certOptions, app);

///////////////////////////
//Listen for connections //
///////////////////////////
server.listen(port);
