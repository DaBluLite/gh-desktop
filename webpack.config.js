const path = require('path');

module.exports = {
    mode: "production",
    entry: './preload.jsx',
    target: "electron-renderer",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: [/node_modules/]
            }
        ]
    },
    resolve: {
        extensions: ['.*', '.js']
    },
    output: {
        path: path.resolve(__dirname),
        filename: 'bundle.js',
    },
};