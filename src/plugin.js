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
            (acc, { filename, source }) => {
              // update asset for the current compilation
              compilation.updateAsset(filename, source);
              return acc + 1;
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
      .filter((filename) => this.testFileName(filename))
      .map((filename) => {
        const asset = assets[filename];
        const source = asset
          .source()
          .replace(/# sourceMappingURL=(.+?\.map)/g, "# $1");

        return {
          filename,
          source: new sources.RawSource(source),
        };
      });
  }

  testFileName(filename) {
    if (this.options.test instanceof RegExp) {
      return this.options.test.test(filename);
    }

    if (typeof this.options.test === "string") {
      return this.options.test === filename;
    }

    if (typeof this.options.test === "function") {
      return this.options.test(filename);
    }

    throw new Error(
      `remove-source-map-url: Invalid "test" option. May be a RegExp (tested against asset key), a string containing the key, a function(key): bool`
    );
  }
}

module.exports = RemoveSourceMapURLWebpackPlugin;
