const fs = require("fs");
const webpack = require("webpack");
const options = require("./mock-project/webpack.config.js");

describe(`Webpack compiles assets`, () => {
  it(`without the plugin, '# sourceMappingURL' comments are NOT removed`, async () => {
    const { stats } = await executeWebpack({
      ...options,
      ...{
        plugins: [],
      },
    });

    stats
      .toJson()
      .assets.map((x) => x.name)
      .filter((name) => name.endsWith(".js"))
      .map((name) => fs.readFileSync(`${options.output.path}/${name}`, "utf-8"))
      .forEach((content) => {
        expect(content.indexOf("sourceMappingURL") !== -1).toBeTruthy();
      });
  });

  it(`with the plugin, '# sourceMappingURL' comments are removed`, async () => {
    const { stats } = await executeWebpack(options);
    stats
      .toJson()
      .assets.map((x) => x.name)
      .filter((name) => name.endsWith(".js"))
      .map((name) => fs.readFileSync(`${options.output.path}/${name}`, "utf-8"))
      .forEach((content) => {
        expect(content.indexOf("sourceMappingURL") === -1).toBeTruthy();
      });
  });
});

function executeWebpack(options) {
  return new Promise((resolve, reject) => {
    webpack(options, (err, stats) => {
      if (err) {
        return reject(err);
      } else if (stats.hasErrors()) {
        return reject(new Error(stats.toString()));
      }
      return resolve({ stats });
    });
  });
}
