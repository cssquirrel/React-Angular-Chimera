var path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './assets/js/app.js',
    output: {
        filename: './dist/ReactAngularChimera/js/bundle.js'
    },
    plugins: [
        new UglifyJSPlugin()
    ],
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