let webpack = require('webpack');

module.exports = {
    entry: {
        app: ['./index.js']
    },
    devtool: 'cheap-module-source-map',
    output: {
        path: __dirname + '/static',
        filename: 'index.js',
        publicPath: '/static/'
    },
    module: {
        loaders: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.s[ac]ss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/ },
            { test: /\.ts$/, use: ['ts-loader'], exclude: /node_modules/ }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.jsx', '.scss', '.css', '.json']
    },
    plugins: [
        new webpack.IgnorePlugin(/.js.map$/)
    ]
};