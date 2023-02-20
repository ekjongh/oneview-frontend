const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "/api": {
        // target: "http://localhost:8000",
        // target: "http://10.203.13.204:8241", // OpenLab
        target: "http://10.220.231.59:8000", // 개발
        // target: "http://10.220.230.193:8000", // 상용
        changeOrigin: true,
      },
    },
  },
  outputDir: "dist",
  publicPath: "/",
  assetsDir: "static",
});
