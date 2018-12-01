const path = require('path')
const webpack = require('webpack')
const DefinePlugin = require('webpack').DefinePlugin
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: 'production',
  context: path.resolve(__dirname),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'mapPromisify.js',
    library: 'mapPromisify',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  entry: {
    index: [
      './src/index.ts'
    ]
  },
  resolve: {
    extensions: [
      '.ts'
    ]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          /* config.module.rule('ts').use('cache-loader') */
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.resolve(__dirname, 'node_modules', '.cache', 'ts-loader'),
              cacheIdentifier: '56acfc0d'
            }
          },
          /* config.module.rule('ts').use('thread-loader') */
          {
            loader: 'thread-loader'
          },
          /* config.module.rule('ts').use('babel-loader') */
          {
            loader: 'babel-loader'
          },
          /* config.module.rule('ts').use('ts-loader') */
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              happyPackMode: true
            }
          }
        ]
      },
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        warningsFilter: () => true,
        extractComments: false,
        sourceMap: false,
        cache: true,
        cacheKeys: defaultCacheKeys => defaultCacheKeys,
        parallel: true,
        include: undefined,
        exclude: undefined,
        minify: undefined,
        terserOptions: {
          output: {
            comments: /^\**!|@preserve|@license|@cc_on/i
          },
          compress: {
            arrows: false,
            collapse_vars: false,
            comparisons: false,
            computed_props: false,
            hoist_funs: false,
            hoist_props: false,
            hoist_vars: false,
            inline: false,
            loops: false,
            negate_iife: false,
            properties: false,
            reduce_funcs: false,
            reduce_vars: false,
            switches: false,
            toplevel: false,
            typeofs: false,
            booleans: true,
            if_return: true,
            sequences: true,
            unused: true,
            conditionals: true,
            dead_code: true,
            evaluate: true
          },
          mangle: {
            safari10: true
          }
        }
      })
    ]
  },
  plugins: [
    /* config.plugin('define') */
    new DefinePlugin(
      {
        'process.env': {
          NODE_ENV: '"production"',
          BASE_URL: '"/"'
        }
      }
    ),
    new CaseSensitivePathsPlugin(),
    /* config.plugin('fork-ts-checker') */
    new ForkTsCheckerWebpackPlugin(
      {
        tslint: true,
        formatter: 'codeframe',
        checkSyntacticErrors: true
      }
    )
  ]
}
