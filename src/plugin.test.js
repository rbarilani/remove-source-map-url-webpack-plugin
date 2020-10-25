const RemoveSourceMapURLWebpackPlugin = require("../index");

describe("RemoveSourceMapURLWebpackPlugin#testFile", () => {
  const files = ["main.js", "foo.js", "bar.js", "john.svg"];
  const cases = [
    ["defaults", undefined, ["main.js", "foo.js", "bar.js"]],
    ["regexp", { test: /\.svg($|\?)/i }, ["john.svg"]],
    ["string", { test: "main.js" }, ["main.js"]],
    [
      "function",
      {
        test: (file) => {
          return file === "main.js" || file === "bar.js";
        },
      },
      ["main.js", "bar.js"],
    ],
  ];

  test.each(cases)(
    "should allow filtering assets based on provided user's options, using %s, user's options: %o",
    (_, options, expectedToMatch) => {
      const plugin = new RemoveSourceMapURLWebpackPlugin(options);
      const matched = files.filter((file) => plugin.testFile(file));

      expect(matched.length).toEqual(expectedToMatch.length);
      expect(matched).toEqual(expectedToMatch);
    }
  );

  it("should throw if user's test option is invalid", () => {
    const plugin = new RemoveSourceMapURLWebpackPlugin({ test: 333 });
    expect(() => plugin.testFile("do-not-matter")).toThrow();
  });
});
