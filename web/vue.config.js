module.exports = {
  devServer: {
    proxy: {
      "^/(users)": {
        target: "http://localhost:3000",
        headers: {
          "X-Forwarded-Host": "localhost:8080"
        }
      }
    }
  }
};
