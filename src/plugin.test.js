const RemoveSourceMapURLWebpackPlugin = require("../index");

describe("RemoveSourceMapURLWebpackPlugin#testFile", () => {
  const files = ["main.js", "foo.js", "bar.js", "john.svg"];
  const cases = [
    [{ test: /\.svg($|\?)/i }, ["john.svg"]],
    [{ test: "main.js" }, ["main.js"]],
    [
      {
        test: (file) => {
          return file === "main.js" || file === "bar.js";
        },
      },
      ["main.js", "bar.js"],
    ],
  ];

  cases.forEach(([options, expectedToMatch]) => {
    it(`should return true for file that must be processed, user options: ${options}`, () => {
      const plugin = new RemoveSourceMapURLWebpackPlugin(options);
      const matched = files.filter((file) => plugin.testFile(file));

      expect(matched.length).toEqual(expectedToMatch.length);
      expect(matched).toEqual(expectedToMatch);
    });
  });

  /*test.each(cases)(
    "should return true for file that must be processed, user options: %o",
    (options, expectedToMatch) => {
      const plugin = new RemoveSourceMapURLWebpackPlugin(options);
      const matched = files.filter((file) => plugin.testFile(file));

      expect(matched.length).toEqual(expectedToMatch.length);
      expect(matched).toEqual(expectedToMatch);
    }
  );*/

  it("should throw if user's test option is invalid", () => {
    const plugin = new RemoveSourceMapURLWebpackPlugin({test: 333});
    expect(() => plugin.testFile("do-not-matter")).toThrow();
  });
});
