'use strict';

const fs = require('fs');
const colors = require('colors/safe');

const RemoveSourceMapURLWebpackPlugin = function(opts) {
  this.options = opts || {};
  this.options.test = this.options.test || /\.js($|\?)/i; 
};

RemoveSourceMapURLWebpackPlugin.prototype.testKey = function (key) {
  if(this.options.test instanceof RegExp) {
    return this.options.test.test(key);
  }

  if(typeof this.options.test === 'string') {
    return this.options.test === key;
  }

  if(typeof this.options.test === 'function') {
    return this.options.test(key);
  }

  throw new Error(`remove-source-map-url: Invalid "test" option. May be a RegExp (tested against asset key), a string containing the key, a function(key): bool`);
}

RemoveSourceMapURLWebpackPlugin.prototype.onAfterCompile = function(compilation, cb) {
  let countMatchAssets = 0;
  Object.keys(compilation.assets).filter((key) => {
    return this.testKey(key);
  })
  .forEach((key) => {
    countMatchAssets += 1;
    let asset = compilation.assets[key];
    let source = asset.source().replace(/# sourceMappingURL=(.+?\.map)/g, '# $1');
    compilation.assets[key] = Object.assign(asset, {
      source: function () { return source }
    });
  });

  if (countMatchAssets) {
    console.log(colors.green(`remove-source-map-url: ${countMatchAssets} asset(s) processed`));
  }

  cb();
};

RemoveSourceMapURLWebpackPlugin.prototype.apply = function(compiler) {
  compiler.plugin('after-compile', this.onAfterCompile.bind(this));
};

module.exports = RemoveSourceMapURLWebpackPlugin;
