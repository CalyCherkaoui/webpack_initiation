# Tutorial to install and practice JS with Webpack

This tuto follow Webpack original documentation:
[Webpack Basic Setup](https://webpack.js.org/guides/getting-started/)

## 1 Stting up the folder

```
$ mkdir webpack-demo
$ cd webpack-demo
```
## 2 Initializing Node and installing Webpack

In the terminal run :
```
$ npm init -y
$ npm install webpack webpack-cli --save-dev
```

Create the following directory structure:
```
  webpack-demo
  |- package.json
  |- /dist
    |- index.html
  |- /src
    |- index.js
```

## 3 Creating a Bundle:

To bundle the lodash dependency with index.js, we'll need to install the library locally:
```
$ npm install --save lodash
```
Bundle the dependency:
```
$ npx webpack
```

## 4 Advanced Webpack configuration:

Add ``webpack.config.js`` to the ``root``
Àt this point the dir structure should be like that:
```
  webpack-demo
  |- /node_modules
  |- package.json
  |- webpack.config.js
  |- /dist
    |- index.html
    |- main.js
  |- /src
    |- index.js
```

In ``./webpack.config.js`` add config code:
```javascript
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
```
In the terminal bundle with:
```
$ npx webpack --config webpack.config.js 
```
## 5 Shortcut to run a local copy of webpack

Make a shortcut to run a local copy of webpack from the CLI with NPM Scripts ``build``
In the ``./package.json`` change ''scripts'' lines value :

```javascript
{
   "name": "webpack-demo",
   "version": "1.0.0",
   "description": "",
   "private": true,
   "scripts": {

    "test": "echo \"Error: no test specified\" && exit 1",

    "build": "webpack"

   },
   "keywords": [],
   "author": "",
   "license": "ISC",
   "devDependencies": {
     "webpack": "^5.4.0",
     "webpack-cli": "^4.2.0"
   },
   "dependencies": {
     "lodash": "^4.17.20"
   }
 }
```

In the terminal run
```
$ npm run build
```












