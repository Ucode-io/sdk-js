const path = require("path");

module.exports = {
  entry: "./src/UcodeSdk.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "ucode_sdk.js",
    library: "UcodeSdk",
    libraryTarget: "umd",
    globalObject: "this",
  },
  mode: "production",
};
