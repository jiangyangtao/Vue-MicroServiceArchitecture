# Vue-MicroServiceArchitecture

Vue 微服务架构

<br/>
<br/>
<br/>

## vue-cli 2.9.6 upgrade webpack 4 the config

> npm order

``` cmd

npm i -D webpack@4.0.0
npm i -D webpack-dev-server@3.1.11
npm i -D webpack-cli
npm i -D extract-text-webpack-plugin@next
npm i -D html-webpack-plugin@next
npm i -D vue-loader@15.6.1
npm install eslint-loader@2.1.1

```

> webpack.base.conf.js

``` javascript

const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development', // Add the config
  plugins: [  // Add the config
    new VueLoaderPlugin()
  ],
}

```

> webpack.dev.conf.js

``` javascript

const devWebpackConfig = merge(baseWebpackConfig, {
  devServer:{
    disableHostCheck: true, // Add the config
  }
}

```

> webpack.prod.conf.js

``` javascript

chunksSortMode: 'auto' // Update the config

// Annotation all webpack.optimize.CommonsChunkPlugin code
// new webpack.optimize.CommonsChunkPlugin({
//   name: 'vendor',
//   minChunks (module) {
//     // any required modules inside node_modules are extracted to vendor
//     return (
//       module.resource &&
//       /\.js$/.test(module.resource) &&
//       module.resource.indexOf(
//         path.join(__dirname, '../node_modules')
//       ) === 0
//     )
//   }
// }),
// // extract webpack runtime and module manifest to its own file in order to
// // prevent vendor hash from being updated whenever app bundle is updated
// new webpack.optimize.CommonsChunkPlugin({
//   name: 'manifest',
//   minChunks: Infinity
// }),
// // This instance extracts shared chunks from code splitted chunks and bundles them
// // in a separate chunk, similar to the vendor chunk
// // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
// new webpack.optimize.CommonsChunkPlugin({
//   name: 'app',
//   async: 'vendor-async',
//   children: true,
//   minChunks: 3
// }),

```