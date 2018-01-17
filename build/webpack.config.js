var path = require('path');

module.exports = {
    entry: './assets/js/app.js',
    output: {
        filename: './dist/ReactAngularChimera/js/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015', 'stage-2']
                }
            }
        ],
    } 
};