"use strict";
const utils = require("./utils");
const config = require("../config");
const merge = require("webpack-merge");
const isProduction = process.env.NODE_ENV === "production";
const sourceMapEnabled = isProduction ? config.build.productionSourceMap : config.dev.cssSourceMap;

module.exports = {
  loaders: merge(
    utils.cssLoaders({
      sourceMap: sourceMapEnabled,
      extract: isProduction
    }),
    {
      ts: ["ts-loader"]
    }
  ),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ["src", "poster"],
    source: "src",
    img: "src",
    image: "xlink:href"
  }
};
