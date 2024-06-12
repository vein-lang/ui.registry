var webpack = require("webpack");
process.env.VUE_APP_VERSION = require('./package.json').version;


module.exports = {
  pwa: {
    name: 'Vein Lang Registry'
  },
  devServer: {
    port: 3000,
    proxy: {
      "/@": {
        target: "http://localhost:5062"
      }
    }
  },
  chainWebpack: (config) => {
    config.plugin('define').tap((definitions) => {
      definitions[0]['process.env']['REGISTRY_API_ENDPOINT'] =
        JSON.stringify(process.env.REGISTRY_API_ENDPOINT || 'http://localhost:5062');
      return definitions;
    });
  }
}
