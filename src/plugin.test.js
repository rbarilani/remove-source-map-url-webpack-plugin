const RemoveSourceMapURLWebpackPlugin = require("../index");

describe("RemoveSourceMapURLWebpackPlugin", () => {
  describe("testFileName", () => {
    const fileNames = ["main.js", "foo.js", "bar.js", "john.svg"];
    const cases = [
      ["defaults", undefined, ["main.js", "foo.js", "bar.js"]],
      ["regexp", { test: /\.svg($|\?)/i }, ["john.svg"]],
      ["string", { test: "main.js" }, ["main.js"]],
      [
        "function",
        {
          test: (fileName) => ["main.js", "bar.js"].includes(fileName),
        },
        ["main.js", "bar.js"],
      ],
    ];

    test.each(cases)(
      "should allow filtering assets based on provided user's options, using %s, user's options: %o",
      (_, options, expected) => {
        const plugin = new RemoveSourceMapURLWebpackPlugin(options);
        const actual = fileNames.filter((fileName) =>
          plugin.testFileName(fileName)
        );

        expect(actual).toEqual(expected);
      }
    );

    it("should throw if user's test option is invalid", () => {
      const plugin = new RemoveSourceMapURLWebpackPlugin({ test: 333 });
      expect(() => plugin.testFileName("do-not-matter")).toThrow();
    });
  });
});
