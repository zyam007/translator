const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    './client/index.js'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      //original
      {test: /\.css$/i, use: ['style-loader', 'css-loader']}
      // {
      //   test: /\.s[ac]ss$/i,
      //   use: [
      //     // Creates `style` nodes from JS strings
      //     'style-loader',
      //     // Translates CSS into CommonJS
      //     'css-loader',
      //     // Compiles Sass to CSS
      //     'sass-loader',
      //   ],
      // },

      // {
      //   test: /\.css$/i,
      //   loader: 'css-loader',
      //   options: {
      //     import: (url, media, resourcePath) => {
      //       // resourcePath - path to css file
      //       // Don't handle `style.css` import
      //       if (url.includes('style.css')) {
      //         return false
      //       }
      //       return true
      //     },
      //   },
      // },
    ]
  }
}
