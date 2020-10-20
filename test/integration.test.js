const fs = require("fs");
const test = require("ava");
const webpack = require("webpack");
const options = require("./mock-project/webpack.config.js");

test.cb(
    "Webpack compiles assets with remove source map plugin enabled",
    (t) => {
        webpack(options, (err, stats) => {
            if (err) {
                return t.end(err);
            } else if (stats.hasErrors()) {
                return t.end(stats.toString());
            }

            stats
                .toJson()
                .assets.map((x) => x.name)
                .filter((name) => name.endsWith(".js"))
                .map((name) =>
                    fs.readFileSync(`${options.output.path}/${name}`, "utf-8")
                )
                .forEach((content) => {
                    t.true(content.indexOf("sourceMappingURL") === -1);
                });

            t.end();
        });
    }
);
