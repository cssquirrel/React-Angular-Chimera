var path = require('path');

module.exports = {
    entry: './App_Plugins/ngImportBoilerplate/js/app.js',
    output: {
        filename: './App_Plugins/ngImportBoilerplate/js/bundle.js'
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