///////////////////
//Server modules //
///////////////////
import path from "path";
import express from "express";
import fs from "fs";
import https from "https";

///////////////////////////////////
//Webpack HRM & Compiler modules //
///////////////////////////////////

import webpack from "webpack";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackDevMiddleware from "webpack-dev-middleware";
import config from "../webpack.config";

import privateEnv from "../config/private_keys";

config.plugins.push(new webpack.HotModuleReplacementPlugin());

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

////////////////////////////
//Init server onver HTTPS //
////////////////////////////
const server = https.createServer(certOptions, app);

///////////////////////////
//Listen for connections //
///////////////////////////
server.listen(port, () => {
  console.log(`
    Server listening on port ${privateEnv.PORT}
  `);
});
