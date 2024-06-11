// // import { resolve } from 'path';

// export const entry = './src/index.js';

// export const output = {
//   path: path.resolve(__dirname, 'dist'),
//   filename: 'shedulelib.js',
//   library: 'SchedulingLibrary',
//   libraryTarget: 'umd',
// };

// export const mode = 'development';

const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'shedulelib.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
