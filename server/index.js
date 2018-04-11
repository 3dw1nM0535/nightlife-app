///////////////////
//Server modules //
///////////////////
import path from "path";
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import mongoose from "mongoose";

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
import bar from "./routes/bar/bar";
import user from "./routes/user/user";
import auth from "./routes/user/auth";

import privateEnv from "./config/private_keys";

// config.plugins.push(new webpack.HotModuleReplacementPlugin());

////////////////////////
//Connect to database //
////////////////////////
mongoose.connect(privateEnv.MONGO_URI);

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
const app = express();

///////////////////////////
//Static file middleware //
///////////////////////////
app.use(express.static(path.resolve("build")));

////////////////////////
//Parse req-body data //
////////////////////////
app.use(bodyParser.json());

////////////////
//Config PORT //
////////////////
const port = process.env.PORT;

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
app.get("*", (req, res) => {
  res.sendFile(path.resolve("./build", "index.html"));
});

/////////////////
//Mount routes //
/////////////////
app.use("/api/bars", bar);
app.use("/api/user", user);
app.use("/api/auth", auth);

////////////////////////////
//Init server over HTTPS //
////////////////////////////
const server = http.createServer(app);

///////////////////////////
//Listen for connections //
///////////////////////////
server.listen(port);
