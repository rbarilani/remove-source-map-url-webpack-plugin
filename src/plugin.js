"use strict";

const { sources, Compilation } = require("webpack");
const colors = require("colors/safe");

class RemoveSourceMapURLWebpackPlugin {
  constructor(opts) {
    this.options = opts || {};
    this.options.test = this.options.test || /\.js($|\?)/i;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap("after-compile", (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: "RemoveSourceMapURLWebpackPlugin",
          stage: Compilation.PROCESS_ASSETS_STAGE_DERIVED,
        },
        (assets) => {
          // process assets
          const count = this.processAssets(assets).reduce(
            (count, { file, source }) => {
              // update asset for the current compilation
              compilation.updateAsset(file, source);
              return count + 1;
            },
            0
          );
          console.log(
            colors.green(
              `remove-source-map-url: ${count}/${
                Object.keys(assets).length
              } asset(s) processed and updated`
            )
          );
        }
      );
    });
  }

  processAssets(assets) {
    return Object.keys(assets)
      .filter((file) => this.testFile(file))
      .map((file) => {
        const asset = assets[file];
        const source = asset
          .source()
          .replace(/# sourceMappingURL=(.+?\.map)/g, "# $1");

        return {
          file,
          source: new sources.RawSource(source),
        };
      });
  }

  testFile(file) {
    if (this.options.test instanceof RegExp) {
      return this.options.test.test(file);
    }

    if (typeof this.options.test === "string") {
      return this.options.test === file;
    }

    if (typeof this.options.test === "function") {
      return this.options.test(file);
    }

    throw new Error(
      `remove-source-map-url: Invalid "test" option. May be a RegExp (tested against asset key), a string containing the key, a function(key): bool`
    );
  }
}

module.exports = RemoveSourceMapURLWebpackPlugin;
