const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, '../'),
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'mapPromisify',
    libraryTarget: 'umd'
  },
  resolve: {
    extension: [
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
              cacheDirectory: path.resolve(__diranme, 'node_modules', '.cache', 'ts-loader'),
              cacheIdentifier: '1dbf5585'
            }
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
              happyPackMode: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new DefinePlugin(
      {
        'process.env': {
          NODE_ENV: '"development"',
          BASE_URL: '"/"'
        }
      }
    ),
    new CaseSensitivePathsPlugin(),
    /* config.plugin('friendly-errors') */
    // new FriendlyErrorsWebpackPlugin(
    //   {
    //     additionalTransformers: [
    //       function () { /* omitted long function */ }
    //     ],
    //     additionalFormatters: [
    //       function () { /* omitted long function */ }
    //     ]
    //   }
    // ),
    new NoEmitOnErrorsPlugin(),
    new ProgressPlugin(),
    new ForkTsCheckerWebpackPlugin(
      {
        vue: true,
        tslint: true,
        formatter: 'codeframe',
        checkSyntacticErrors: false
      }
    )
  ]
}
