const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  publicPath: isProduction ? "/github-search-clone/" : "/",
  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false
    }
  },
  transpileDependencies: ["quasar"]
};
