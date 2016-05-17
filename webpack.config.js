var path = require('path')
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
              test: /\.scss$/,
              loaders: ["style", "css", "sass"]
            }
        ]
    }
    // sassLoader: {
    //   includePaths: [path.resolve(__dirname, "../../styles")]
    // }
}
