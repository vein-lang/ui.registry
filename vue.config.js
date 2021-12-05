const webpack = require("webpack");

module.exports = {
  devServer: {
    port: 3000,
    proxy: {
      "/@": {
        target: "https://localhost:7181"
      }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jquery: "jquery",
        "window.jQuery": "jquery",
        jQuery: "jquery"
      })
    ]
  }
};
