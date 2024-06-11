import { resolve } from 'path';

export const entry = './src/index.js';

export const output = {
  path: resolve(__dirname, 'dist'),
  filename: 'shedulelib.js',
  library: 'SchedulingLibrary',
  libraryTarget: 'umd',
};
export const module = {
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
};

export const mode = 'development';
