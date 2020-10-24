Remove Source Map Url Webpack Plugin
====================================

![npm](https://img.shields.io/npm/dw/@rbarilani/remove-source-map-url-webpack-plugin)
[![Build Status](https://travis-ci.com/rbarilani/remove-source-map-url-webpack-plugin.svg?branch=master)](https://travis-ci.com/rbarilani/remove-source-map-url-webpack-plugin)
[![dependencies Status](https://david-dm.org/rbarilani/remove-source-map-url-webpack-plugin/status.svg)](https://david-dm.org/rbarilani/remove-source-map-url-webpack-plugin)
[![devDependencies Status](https://david-dm.org/rbarilani/remove-source-map-url-webpack-plugin/dev-status.svg)](https://david-dm.org/rbarilani/remove-source-map-url-webpack-plugin?type=dev)
[![Coverage Status](https://coveralls.io/repos/github/rbarilani/remove-source-map-url-webpack-plugin/badge.svg?branch=coveralls)](https://coveralls.io/github/rbarilani/remove-source-map-url-webpack-plugin?branch=coveralls)

This is a webpack plugin that removes `# sourceMappingURL` after compilation.<br>
It's a quick fix for wrong `# sourceMappingURL` comments left in vendor source code when compiling without minification (causing 404 responses from the server).


## Install 

Install the plugin via npm, you need to pick the right version **based on the webpack version** used in your project.

**Webpack 4**

With webpack 4 install 0.x version of the plugin.

```bash
$ npm install @rbarilani/remove-source-map-url-webpack-plugin@0.x --save-dev
```

**Webpack 5**

With webpack 5 install next version of the plugin.

```bash
$ npm install @rbarilani/remove-source-map-url-webpack-plugin@next --save-dev
```

## Usage

```js
var RemoveSourceMapUrlWebpackPlugin = require('@rbarilani/remove-source-map-url-webpack-plugin');
var webpackConfig = {
  entry: 'index.js',
  output: {
    path: 'dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new RemoveSourceMapUrlWebpackPlugin({
      test: /index_bundle\.js$/
    })
  ]
};
```

## Configuration

* `test`: A condition that must be met. A condition may be a RegExp (tested against absolute asset key), a string containing the key, a function(key): bool.<br>
*(default: `/\.js($|\?)/i`)*

## Contributing

You're free to contribute to this project by submitting issues and/or pull requests.

## Development

### NPM scripts

* `npm test` - run test suite
* `npm run test:coverage` - run test suite and generate coverage reports
* `npm run test:build` - build the test mock project with webpack-cli
* `npm run format` - format code following project conventions
* `npm run coveralls` - send coverage report to https://coveralls.io

## License

This project is licensed under [MIT](./LICENSE).


