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
      }),
      new webpack.DefinePlugin({
        'process.env.REGISTRY_API_ENDPOINT': JSON.stringify(process.env.REGISTRY_API_ENDPOINT || 'https://localhost:8080')
      }),
    ]
  }
};
