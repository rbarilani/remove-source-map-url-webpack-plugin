const fs = require("fs");
const webpack = require("webpack");
const DEFAULT_WEBPACK_CONFIG = require("./mock-project/webpack.config.js");

describe(`Webpack compiles assets`, () => {
  it(`without the plugin, '# sourceMappingURL' comments are NOT removed`, async () => {
    const options = {
      ...DEFAULT_WEBPACK_CONFIG,
      ...{
        plugins: [],
      },
    };
    const { stats } = await runWebpack(options);

    readFilesFromStats(stats, options).forEach((content) => {
      expect(content).toContain("sourceMappingURL");
    });
  });

  it(`with the plugin, '# sourceMappingURL' comments are removed`, async () => {
    const { stats } = await runWebpack(DEFAULT_WEBPACK_CONFIG);
    readFilesFromStats(stats, DEFAULT_WEBPACK_CONFIG).forEach((content) => {
      expect(content).not.toContain("sourceMappingURL");
    });
  });
});

function runWebpack(options) {
  return new Promise((resolve, reject) => {
    webpack(options, (err, stats) => {
      if (err) {
        return reject(err);
      }
      if (stats.hasErrors()) {
        return reject(new Error(stats.toString()));
      }
      return resolve({ stats });
    });
  });
}

function readFilesFromStats(stats, options) {
  return stats
    .toJson()
    .assets.map((x) => x.name)
    .filter((name) => name.endsWith(".js"))
    .map((name) => fs.readFileSync(`${options.output.path}/${name}`, "utf-8"));
}
