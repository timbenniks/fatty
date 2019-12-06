const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [
        path.resolve(__dirname, "./src/styles/_variables.scss"),
        path.resolve(__dirname, "./src/styles/_mixins.scss")
      ]
    }
  },

  configureWebpack: {
    plugins: [new CopyPlugin([{ from: "src/assets/content", to: "./api" }])]
  },

  pwa: {
    name: "Fatty",
    themeColor: "#0a1d2d",
    msTileColor: "#22292f",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",

    // configure the workbox plugin
    workboxPluginMode: "GenerateSW",
    workboxOptions: {}
  }
};
