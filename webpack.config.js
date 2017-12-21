var path = require('path')
var webpack = require('webpack')
const fs = require('fs-extra');
const ip = require('ip').address();
const entry = {};
const weexEntry = {};
const vueWebTemp = 'temp';
const hasPluginInstalled = fs.existsSync('./web/plugin.js');
const isWin = /^win/.test(process.platform);
let fileType = '';
// Wraping the entry file
const getEntryFileContent = (entryPath, vueFilePath) => {
  let relativePath = path.relative(path.join(entryPath, '../'), vueFilePath);
  let contents = '';
  /**
   * The plugin's logic currently only supports the .we version
   * which will be supported later in .vue
   */
  if (hasPluginInstalled) {
    const plugindir = path.resolve('./web/plugin.js');
    contents = 'require(\'' + plugindir + '\') \n';
  }
  if (isWin) {
    relativePath = relativePath.replace(/\\/g, '\\\\');
  }
  contents += 'var App = require(\'' + relativePath + '\')\n';
  contents += 'App.el = \'#root\'\n';
  contents += 'new Vue(App)\n';
  return contents;
}
// Retrieve entry file mappings by function recursion
const walk = (dir) => {
  dir = dir || '.';
  const directory = path.join(__dirname, 'src', dir);
  fs.readdirSync(directory).forEach((file) => {
    const fullpath = path.join(directory, file);
    const stat = fs.statSync(fullpath);
    const extname = path.extname(fullpath);
    if (stat.isFile() && extname === '.vue' || extname === '.we') {
      if (!fileType) {
        fileType = extname;
      }
      if (fileType && extname !== fileType) {
        console.log('Error: This is not a good practice when you use ".we" and ".vue" togither!');
      }
      const name = path.join(dir, path.basename(file, extname));
      if (extname === '.vue') {
        const entryFile = path.join(vueWebTemp, dir, path.basename(file, extname) + '.js');
        fs.outputFileSync(path.join(entryFile), getEntryFileContent(entryFile, fullpath));
        entry[name] = path.join(__dirname, entryFile) + '?entry=true';
      }
      weexEntry[name] = fullpath + '?entry=true';
    } else if (stat.isDirectory() && file !== 'build' && file !== 'include') {
      const subdir = path.join(dir, file);
      walk(subdir);
    }
  });
}
// Generate an entry file before writing a webpack configuration
walk();

const plugins = [
  /*
   * Plugin: UglifyJsPlugin
   * Description: UglifyJS plugin for webpack
   * See: https://github.com/webpack-contrib/uglifyjs-webpack-plugin
   */
  // new webpack.optimize.UglifyJsPlugin({
  //   minimize: true
  // }),
  /*
   * Plugin: BannerPlugin
   * Description: Adds a banner to the top of each generated chunk.
   * See: https://webpack.js.org/plugins/banner-plugin/
   */
  new webpack.BannerPlugin({
    banner: '// { "framework": ' + (fileType === '.vue' ? '"Vue"' : '"Weex"') + '} \n',
    raw: true,
    exclude: 'Vue'
  }),
];
// Config for compile jsbundle for web.
const webConfig = {
  context: path.join(__dirname, ''),
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].web.js'
  },
  /**
   * Developer tool to enhance debugging
   *
   * See: http://webpack.github.io/docs/configuration.html#devtool
   * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
   */
  devtool: 'source-map',
  /*
   * Options affecting the resolving of modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
  module: {
    // webpack 2.0
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader'
      }],
      exclude: /node_modules(?!\/.*(weex).*)/
    },{
      test: /\.vue(\?[^?]+)?$/,
      use: [{
        loader: 'vue-loader',
        options: {
          compilerModules: [
            {
              postTransformNode: el => {
                el.staticStyle = `$processStyle(${el.staticStyle})`
                el.styleBinding = `$processStyle(${el.styleBinding})`
              }
            }
          ]
        }
      }]
    }]
  },
  /*
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: plugins,
  devServer: {
    // contentBase: path.join(__dirname, './web'),
    port: 8080,
    // host: ip,
    inline: true,
    historyApiFallback: {
      index: '/web/'
    },

    // historyApiFallback: true,
  },
   resolveLoader: {
        alias: {
            'scss-loader': 'sass-loader',
        },
    },
};
// Config for compile jsbundle for native.
const weexConfig = {
  entry: weexEntry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  /*
   * Options affecting the resolving of modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader'
      }],
      exclude: /node_modules(?!\/.*(weex).*)/
    }, {
      test: /\.vue(\?[^?]+)?$/,
      use: [{
        loader: 'weex-loader',
      }]
    }, {
      test: /\.we(\?[^?]+)?$/,
      use: [{
        loader: 'weex-loader'
      }]
    }]
  },
  /*
   * These options configure whether to polyfill or mock certain Node.js globals and modules.
   * This allows code originally written for the Node.js environment to run in other environments like the browser.
   *
   * See: https://webpack.js.org/configuration/node/#node
   */
  node: {
    setImmediate: false
    // See "Other node core libraries" for additional options.
  },
  /*
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: plugins,
  resolveLoader: {
    alias: {
      'scss-loader': 'sass-loader',
    },
  }
};

module.exports = [webConfig,weexConfig];
