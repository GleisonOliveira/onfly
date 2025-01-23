const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3000, // Replace with your desired port number,
    watchFiles: {
      paths: ["src/**/*"],
      options: {
        usePolling: true,
      },
    },
  },
});
