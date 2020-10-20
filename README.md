Remove Source Map Url Webpack Plugin
====================================

This is a webpack plugin that removes `# sourceMappingURL` after compilation.<br>
It's a quick fix for wrong `# sourceMappingURL` comments left in vendor source code when compiling without minification (causing 404 responses from the server).


Maintainer: Ruben Barilani

[![Build Status](https://travis-ci.com/rbarilani/remove-source-map-url-webpack-plugin.svg?branch=master)](https://travis-ci.com/rbarilani/remove-source-map-url-webpack-plugin)


## Install 

Install the plugin via npm:

```bash
$ npm install @rbarilani/remove-source-map-url-webpack-plugin --save-dev
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

* `npm test`: run test suite
* `npm run test:build`: build the mock project with webpack-cli
* `npm run format`: format code following project conventions

## License

This project is licensed under [MIT](./LICENSE).


