/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const nodeExternals = require('webpack-node-externals');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const env = require('env-var');
const { getAssetUrl } = require('@uc/deploy-assets');

const USE_CDN = env.get('DEPLOY_TAG', '').asString();
const vendorChunks = [];

module.exports = (_, argv) => {
  const { mode } = argv;
  const output = {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
  };
  const babelLoader = {
    test: /\.(js|tsx|ts)$/,
    loader: 'babel-loader',
    include: [path.resolve(__dirname, 'src')],
    exclude: /node_modules/,
  };
  const rawLoader = {
    test: /\.svg$/,
    loader: 'raw-loader',
  };
  const resolve = {
    extensions: ['.ts', '.tsx', '.js', '.mjs', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  };

  return [
    {
      mode,
      devtool: 'source-map',
      entry: {
        client: [path.resolve(__dirname, 'src/client/index.tsx')],
      },
      output: {
        ...output,
        filename: mode === 'production' ? '[name].[chunkhash:8].js' : '[name].[hash:8].js',
        publicPath: USE_CDN ? getAssetUrl() + '/' : '/video-generator/static/',
      },
      plugins: [
        new CleanWebpackPlugin(['dist']),
        new ManifestPlugin({
          path: '',
          writeToFileEmit: true,
          filename: 'manifest.json',
        }),
      ],
      optimization: {
        splitChunks: {
          cacheGroups: {
            commons: {
              test: (module) =>
                module.resource &&
                module.resource.includes('node_modules') &&
                vendorChunks.every((chunk) => !module.resource.includes(chunk)),
              name: 'vendor',
              chunks: 'all',
            },
          },
        },
      },
      resolve,
      module: {
        rules: [
          babelLoader,
          rawLoader,
          ...(mode === 'development'
            ? [
                {
                  test: /\.js$/,
                  use: ['source-map-loader'],
                  enforce: 'pre',
                },
              ]
            : []),
        ],
      },
    },
    {
      mode,
      entry: {
        server: path.join(__dirname, 'src/server/index.ts'),
      },
      output: {
        ...output,
        filename: 'server.js',
      },
      plugins: [new ForkTsCheckerWebpackPlugin()],
      target: 'node',
      externals: [
        nodeExternals({
          whitelist: [/\.mjs$/i],
        }),
      ],
      resolve,
      module: {
        rules: [
          {
            ...babelLoader,
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      node: 'current',
                    },
                  },
                ],
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
            },
          },
          rawLoader,
        ],
      },
    },
  ];
};
