////////////////////////
//ES6 code transpiler //
////////////////////////

var path = require("path");
var webpack = require("webpack");
var autoprefixer = require("autoprefixer");
var UglifyJSPlugin = require("uglifyjs-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  /////////////////////////
  //Entry folder or file //
  /////////////////////////
  mode: "production",
  devtool: "source-map",
  entry: [
    path.join(__dirname, "/client/index.js"),
  ],
  /////////////////////////////
  //Output after transpiling //
  /////////////////////////////
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/",
  },
  ////////////////////////
  //Plugins for webpack //
  ////////////////////////
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/client/index.html"
    }),
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  //////////
  //Rules //
  //////////
  module: {
    rules: [
      { test: /\.(woff2?|svg|jpe?g|png|gif|ico|eot|ttf)$/, loader: "url-loader?limit=10000" },
      {
        ///////
        //JS //
        ///////
        test: /\.js$/,
        loaders: ["babel-loader?" + JSON.stringify({ cacheDirectory: true }), ],
        include: path.join(__dirname, "/client"),
      },
      {
        ////////
        //CSS //
        ////////
        test: /\.css$/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { importLoaders: 1 } },

          //////////////////////////////////////
          //Configure for CSS imports to work //
          //////////////////////////////////////
          { loader: "postcss-loader", options: { ident: "postcss", plugins: () => [
            require("postcss-flexbugs-fixes"),
            autoprefixer({
              browsers: [
                ">1%",
                "last 4 versions",
                "Firefox ESR",
                "not ie < 9",
              ],
              flexbox: "no-2009"
            })
          ]}},
        ],
      }
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  }
}
