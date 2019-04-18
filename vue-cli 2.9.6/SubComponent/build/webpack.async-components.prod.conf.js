const webpack = require('webpack');
const path = require('path');
const utils = require('./utils');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const VueLoaderPlugin = require('vue-loader/lib/plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {  // 抽离自己写的公共代码
          chunks: "async",  // async针对异步加载的chunk做切割，initial针对初始chunk，all针对所有chunk。
          name: "common", // 打包后的文件名，任意命名
          minChunks: 2,//最小引用2次
          minSize: 30000 // 只要超出30000字节就生成一个新包
        },
        vendor: {   // 抽离第三方插件
          test: /[\\/]node_modules[\\/]/, // 指定是node_modules下的第三方包
          chunks: 'initial',
          name: 'vendor',  // 打包后的文件名，任意命名
          priority: 10 // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
        },
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        exclude: /\.min\.js$/,
        cache: true,
        parallel: true, // 开启并行压缩，充分利用cpu
        sourceMap: false,
        extractComments: false, // 移除注释
        uglifyOptions: {
          compress: true
        }
      })
    ]
  },
  entry: {
    path: resolve('/src/components.install.js'),
  },
  output: {
    path: resolve('/static/'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  externals: {
    vue: 'vue',
    axios: 'axios',
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          esModule: true, // vue-loader v13 更新 默认值为 true v12及之前版本为 false, 此项配置影响 vue 自身异步组件写法以及 webpack 打包结果
          loaders: utils.cssLoaders({
            sourceMap: true,
            extract: true // css 不做提取
          }),
          transformToRequire: {
            video: 'src',
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ],
        include: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    // UglifyJs do not support ES6+, you can also use babel-minify for better treeshaking: https://github.com/babel/minify
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: false,
    //   sourceMap: true
    // }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // new VueLoaderPlugin()
  ]
};
