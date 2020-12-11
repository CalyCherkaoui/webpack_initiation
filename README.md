# Tutorial to install and practice JS with Webpack

This tuto follow Webpack original documentation:
[Webpack Basic Setup](https://webpack.js.org/guides/getting-started/)

The idea is to build a simple project that required an external library [lodash](https://lodash.com/) by installing webpack with npm

## Table of content:

- [SETTING UP](#1.-SETTING-UP)
- [ASSET MANAGEMENT WITH WEBPACK](#2.-ASSET-MANAGEMENT-WITH-WEBPACK)
- [OUTPUT MANAGEMENT WITH WEBPACK](#3.-OUTPUT-MANAGEMENT-WITH-WEBPACK)
- [DEVELOPMENT ENVIRONEMENT](#4.-DEVELOPMENT-ENVIRONEMENT)


# 1. SETTING UP
## 1.1 Stting up the folder

```
$ mkdir webpack-demo
$ cd webpack-demo
```
## 1.2 Initializing Node and installing Webpack

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

## 1.3 Creating a Bundle:

To bundle the lodash dependency with index.js, we'll need to install the library locally:
```
$ npm install --save lodash
```
Bundle the dependency:
```
$ npx webpack
```

## 1.4 Advanced Webpack configuration:

Add ``webpack.config.js`` to the ``root``
At this point the dir structure should be like that:
```
  webpack-demo
  |- /node_modules
  |- package.json
  |- webpack.config.js
  |- /dist
    |- index.html
    |- bundle.js
  |- /src
    |- index.js
```

In ``./webpack.config.js`` add config code:
```javascript
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
```
In the terminal bundle with:
```
$ npx webpack --config webpack.config.js 
```
## 1.5 Shortcut to run a local copy of webpack

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

## 1.6 Usage

1- Write code or create import/export modules in ``/src``
<br>
2- run 
```
$ npx webpack
```

# 2. ASSET MANAGEMENT WITH WEBPACK

## 2.1 Loading CSS

Enables us to import './style.css' into the file that depends on that styling.
when that module is run, a `` <style>`` tag with the stringified css will be inserted into the ``<head>`` of our html file.

To import a CSS file from within a JavaScript module:
```
$ npm install --save-dev style-loader css-loader
```

Add a module to ``webpack.config.js`` file
```javascript
  // webpack.config.js

  const path = require('path');

  module.exports = {

      //...

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  };
```
Add a ``style.css`` in ``./src`` folder.
At this point, Our project files structure looks like:
```
  webpack-demo
    |- package.json
    |- webpack.config.js
    |- /dist
      |- bundle.js
      |- index.html
    |- /src
      |- style.css
      |- index.js
    |- /node_modules
```
Import style.css in ``./src/index.js`` file:

```javascript
  import './style.css';
  //.....
```

Add some styling in the style.css and run
```
  $ npm run build
```
## 2.2 Loading Images:

How it works:
When we import MyImage from ``./my-image.png``, that image will be processed and added to our output directory and the MyImage variable will contain the final url of that image after processing. When using the css-loader, as shown above, a similar process will occur for ``url('./my-image.png')`` within our CSS. The loader will recognize this is a local file, and replace the './my-image.png' path with the final path to the image in our output directory. The html-loader handles ``<img src="./my-image.png" />`` in the same manner.

Add the image loader in the module rules in ``webpack.config.js`` file:
```javascript
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
  };
```

Add the image file ``my-image.png`` inside the ./src
```
webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
    |- my-image.png
    |- style.css
    |- index.js
  |- /node_modules
```
Import the image in ``./src/index.js`` file:

```javascript
  import myImage from './my-image.png';
  //.....
```

Or use it as background in ``style.css`` file:
```
 .hello {
    color: red;
    background: url('./my-image.png');
 }
```

Compile with
```
  $ npm run build
```

## 2.3 Loading Fonts:
The Asset Modules will take any file you load through them and output it to your build directory. This means we can use them for any kind of file, including fonts.
It's the same process as loading images. Refer to [webpack documentation webpage](https://webpack.js.org/guides/asset-management/#loading-fonts)

## 2.4 Loading DATA ( XML - CSV)

[webpack documentation webpage](https://webpack.js.org/guides/asset-management/#loading-data)

# 3. OUTPUT MANAGEMENT WITH WEBPACK

So far we've manually included all our assets in our index.html file, but as your application grows and once you start using hashes in filenames and outputting multiple bundles, it will be difficult to keep managing your index.html file manually. However, a few plugins exist that will make this process much easier to manage

Let's add ``print.js`` with an export function to the ``./src`` folder
```
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
  |- /src
    |- index.js
    |- print.js
  |- /node_modules
```
Update ``dist/index.html`` file in preparation for webpack to split out entries
```html
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Output Management</title>
      <script src="./print.bundle.js"></script>
    </head>
    <body>
      ........
      <script src="bundle.js"></script>
      <script src="./index.bundle.js"></script>
    </body>
  </html>
```

To adjust the config, we add our ``src/print.js`` as a new entry point (print) and we change the output as well, so it will dynamically generate bundle names, based on the entry point names:

in ``webpack.config.js`` file:
```javascript
  const path = require('path');

  // .....

  module.exports = {
    entry: { // change in entry
      index: './src/index.js',
      print: './src/print.js',
    },
    output: {
      filename: '[name].bundle.js', // change in output filename
      path: path.resolve(__dirname, 'dist'),
    },
  };
```
run
```
  $ npm run build
```
## 3.1 Setting up HtmlWebpackPlugin
 what would happen if we changed the name of one of our entry points, or even added a new one? The generated bundles would be renamed on a build, but our index.html file would still reference the old names. Let's fix that with the HtmlWebpackPlugin.

```
  $ npm install --save-dev html-webpack-plugin
```
In ``Webpack.config.js``

```javascript
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  module.exports = {
    entry: {
      index: './src/index.js',
      print: './src/print.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Output Management',
      }),
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
```
HtmlWebpackPlugin by default will generate its own index.html file and will replace our index.html file with a newly generated one.
Run:
```
  $ npm run build
```
## 3.2 Cleaning up the /dist folder

Webpack will generate the files and put them in the /dist folder for you, but it doesn't keep track of which files are actually in use by your project.
As we code , /dist folder becomes quite cluttered. 
In general it's good practice to clean the /dist folder before each build.

```
  $ npm install --save-dev clean-webpack-plugin
```
In the webpack.config.js file
```javascript
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');
  module.exports = {
    entry: {
      index: './src/index.js',
      print: './src/print.js',
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Output Management',
      }),
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
```
run
```
  $ npm run build
```
Now we only see the files generated from the build and no more old files.

# 4. DEVELOPMENT ENVIRONEMENT

setting mode to 'development' and title to 'Development' in the ``webpack.confih.js``
```javascript
    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const { CleanWebpackPlugin } = require('clean-webpack-plugin');
    
    module.exports = {
      mode: 'development',
      entry: {
        index: './src/index.js',
        print: './src/print.js',
      },
      plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          title: 'Development',
        }),
      ],
      output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
      },
    };
```
## 4.1 Source maps (inline-source-map option)
In order to make it easier to track down errors and warnings, JavaScript offers source maps, which map your compiled code back to your original source code. If an error originates from b.js, the source map will tell you exactly that.
In ``webpack.config.js`` add:
```javascript
    const path = require('path');

    //......

    module.exports = {
      //....
      devtool: 'inline-source-map',
      //...
    };
```
run 
```
  $ npm run build
```
## 4.2 Using Watch Mode

Goodbye ``npm run build``!
We can instruct webpack to "watch" all files within our dependency graph for changes. If one of these files is updated, the code will be recompiled so we don't have to run the full build manually.
In ``package.json``, let's add ``"watch": "webpack --watch",`` to scripts:
```javascript
  {
    //...
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "watch": "webpack --watch",
        "build": "webpack"
    }
    //..
  }
```
We need to tell CleanWebpackPlugin that we don't want to remove the index.html file after the incremental build triggered by watch. In ``webpack.config.js`` :
```javascript
  //...
  module.exports = {
    //...
    plugins: [
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
      new HtmlWebpackPlugin({
            title: 'Development',
      }),
    ],
    //...
  };
```
From the command line run:
```
  $ npm run watch
```
## 4.3 Using webpack-dev-server
The webpack-dev-server provides you with a simple web server and the ability to use live reloading
```
  $ npm install --save-dev webpack-dev-server
```
Change the configuration file in ``webpack.config.js`` to tell the dev server where to look for files.
The webpack-dev-server will serve the files from the dist directory on localhost:8080
```javascript
  //...
  module.exports = {
    //...
    devServer: {
        contentBase: './dist',
    },
    //..
  };
```
Let's add a script in ``package.json`` file, to easily run the dev server
```javascript
    {
      //...
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "watch": "webpack --watch",
        "start": "webpack serve --open",
        "build": "webpack"
      },
      //...
    }
```