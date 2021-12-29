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
        target: "https://localhost:7181"
      }
    }
  },
  chainWebpack: (config) => {
    config.plugin('define').tap((definitions) => {
      definitions[0]['process.env']['REGISTRY_API_ENDPOINT'] =
        JSON.stringify(process.env.REGISTRY_API_ENDPOINT || 'https://localhost:8080');
      return definitions;
    });
  }
}
