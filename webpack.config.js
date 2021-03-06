const path = require("path");
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  entry: {
    app: ['./components/app.js']
  },
  output: {
    path: path.resolve(__dirname, "public"),
    publicPath: "/assets/",
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel'
    },
    { 
      test: /\.handlebars$/, 
      loader: "handlebars-loader" 
    },
    {
      test: /\.scss$/,
      loaders: ["style", "css", "sass"]
    }]
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: [
    new WebpackNotifierPlugin({title: 'Webpack'}),
  ],
  devServer: {
    contentBase: './public'
  }
};

