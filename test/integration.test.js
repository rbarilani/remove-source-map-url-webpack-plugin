const fs = require("fs");
const test = require("ava");
const webpack = require("webpack");
const options = require("./mock-project/webpack.config.js");

test.cb("Webpack compiles assets with remove source map plugin enabled", (t) => {
    webpack(options, (err, stats) => {
        if (err) {
            return t.end(err);
        } else if (stats.hasErrors()) {
            return t.end(stats.toString());
        }

        const distFilesContents = stats
            .toJson()
            .assets.map((x) => x.name)
            .filter((name) => name.endsWith(".js"))
            .map((name) =>  fs.readFileSync(`${options.output.path}/${name}`, 'utf-8'))
            .forEach(content => {
                t.true(content.indexOf("sourceMappingURL") === -1);
            });

        t.end();
    });
    // 1. Run webpack
    /*webpack(options, function (err, stats) {
        // 2. Fail test if there are errors
        if (err) {
            return t.end(err);
        } else if (stats.hasErrors()) {
            return t.end(stats.toString());
        }

        // 3. Map asset objects to output filenames
        const files = stats.toJson().assets.map((x) => x.name);

        // 4. Run assertions. Make sure that the three expected
        //    HTML files were generated
        t.true(files.indexOf("index.html") !== -1);
        t.true(files.indexOf("about.html") !== -1);
        t.true(files.indexOf("404.html") !== -1);

        t.end();
    });*/
});
