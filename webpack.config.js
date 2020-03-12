module.exports = {
  entry: ['./inc/polyfills.js', './client/index.js'],
  output: {
    path: __dirname,
    filename: './build/bundle.js',
    publicPath: '/',
  },
  mode: process.env.NODE_ENV,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8000',
      '/auth': 'http://localhost:8000',
    },
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /.(c|s[ac])ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
