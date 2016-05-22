module.exports = {
  entry: './main.js',
  output: {
    path: __dirname,
    filename: 'index.js'
  },
  devServer: {
    inline: true,
    port: 3333
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file?name=src/styles/fonts/[name].[ext]'
      },
      {
        test: /(layers.*|marker-.*)\.png$/,
        loader: 'file?name=node_modules/leaflet/dist/images/[name].[ext]'
      }
    ]
  }
}
