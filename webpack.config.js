const path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './server/index.js',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    target: 'node',
    externals: [nodeExternals()],
    devtool: 'inline-source-map',
    node: {
        __dirname: true
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};