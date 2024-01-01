const path = require('path');

module.exports = env => {
    return {
        mode: "production",
        target: "electron-renderer",
        entry: {
            index: './preload.tsx'
        },
        module: {
            rules: [
                {
                    test: /\.(tsx|jsx|ts|js)?$/,
                    use: "babel-loader",
                    exclude: /node_modules/,
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        {
                            loader: 'style-loader',
                            options: {
                                insert: require.resolve('./insert.ts'),
                            }
                        },
                        "css-loader",
                        {
                            loader: "sass-loader",
                            options: {
                                implementation: require("sass"),
                            },
                        },
                    ],
                },
            ]
        },
        resolve: {
            extensions: ['.*', '.js', '.jsx', '.scss', '.sass', '.ts', '.tsx']
        },
        output: {
            path: path.resolve(__dirname),
            filename: 'bundle.js',
        },
    }
};