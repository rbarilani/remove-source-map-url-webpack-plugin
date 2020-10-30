Remove Source Map Url Webpack Plugin
====================================

![npm latest version](https://img.shields.io/npm/v/@rbarilani/remove-source-map-url-webpack-plugin)
![npm downloads](https://img.shields.io/npm/dm/@rbarilani/remove-source-map-url-webpack-plugin?style=plastic)
[![dependencies Status](https://david-dm.org/rbarilani/remove-source-map-url-webpack-plugin/status.svg)](https://david-dm.org/rbarilani/remove-source-map-url-webpack-plugin)
[![devDependencies Status](https://david-dm.org/rbarilani/remove-source-map-url-webpack-plugin/dev-status.svg)](https://david-dm.org/rbarilani/remove-source-map-url-webpack-plugin?type=dev)
[![Build Status](https://travis-ci.com/rbarilani/remove-source-map-url-webpack-plugin.svg?branch=master)](https://travis-ci.com/rbarilani/remove-source-map-url-webpack-plugin)
[![Coverage Status](https://coveralls.io/repos/github/rbarilani/remove-source-map-url-webpack-plugin/badge.svg?branch=master)](https://coveralls.io/github/rbarilani/remove-source-map-url-webpack-plugin?branch=master)

This is a webpack plugin that removes `# sourceMappingURL` after compilation.<br>
It's a quick fix for wrong `# sourceMappingURL` comments left in vendor source code when compiling without minification (causing 404 responses from the server).


## Install 

You can install the plugin via npm or yarn, pick the right version **based on the webpack version** used in your project.

**Webpack 4**

For webpack 4 install the 0.x version

```bash
$ npm install @rbarilani/remove-source-map-url-webpack-plugin@0.x --save-dev
```

**Webpack 5**

For webpack 5 install the latest version

```bash
$ npm install @rbarilani/remove-source-map-url-webpack-plugin@latest --save-dev
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

## Options

* `test`: A condition that must be met to include or exclude the assets that should be processed (*default*: `/\.js($|\?)/i`). The allowed types for a condition are:
    * `String` - A string for exact matching with the file name of the asset
    * `RegExp` - A regular expression which will be tested against the file name of the asset
    * `Function(fileName:string):bool` - A function that will be invoked with the file name of the asset as the argument and must return `true` to include the asset or `false` to exclude it


## Contributing

You're are welcome to contribute to this project by submitting issues and/or pull requests.

## Development

### NPM scripts

* `npm test` - run test suite
* `npm run test:coverage` - run test suite and generate coverage reports
* `npm run test:build` - build the test mock project with webpack-cli
* `npm run lint` - lint the code base with eslint
* `npm run lint:fix` - try to fix as many linting issues as possible (the command will also format the code)
* `npm run format` - format code following project conventions
* `npm run coveralls` - send coverage report to https://coveralls.io

## License

This project is licensed under [MIT](./LICENSE).


