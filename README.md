# transform-json-webpack-plugin
Webpack plugin to generate a JSON asset file.


## Install

```bash
npm install --save-dev transform-json-webpack-plugin
```

## Options

|Name|Type|Description|
|:--:|:--:|:----------|
|[`filename`](#filename)|`{String}`|Output file name(may include path)|
|[`object`](#object)|`{Object}`|Object to add to output file or the properties you wish to modify|
|[`source`](#source)|`{String}`|Path to an existing JSON file to extend (optional)|

## Usage

In your `webpack.config.js` instantiate the plugin.

```javascript
const TransformJson = require('transform-json-webpack-plugin');

module.exports = {
  // webpack configuration
  // ...
  plugins: [
    new TransformJson({
      // json configuration
    })
  ]
};
```

Here is a basic example that creates a `mainfest.json` file in your output directory:

**webpack.config.js**
```javascript
module.exports = {
  output: {
    path: 'build/'
  },
  // ...
  plugins: [
    new TransformJson({
      filename: 'manifest.json',
      value: {
        gundam: 'wing-zero'
      }
    })
  ]
};

```
That will generate a file that looks like this:

**manifest.json**
```json
{
  "gundam": "wing-zero"
}
```

Here is a basic example that creates a production deployment version of your `package.json` file in your output directory:

**webpack.config.js**
```javascript
module.exports = {
  output: {
    path: 'build/'
  },
  // ...
  plugins: [
    new TransformJson({
      filename: 'package.json',
      source: __dirname + "/package.json",
      object: {
          devDependencies: {},
          scripts: {"start": "node index.js"}
      }
    })
  ]
};

```
That will generate a file that looks like this:

**package.json**
```json
{
  "name": "your-project",
  "version": "0.0.1",
  "dependencies": { "express": "^4.16.3" },
  "devDependencies": {},
  "scripts": {"start": "node index.js"}
}
```

