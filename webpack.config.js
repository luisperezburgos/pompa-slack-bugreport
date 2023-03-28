const path = require('path');
const MemoryFS = require("memory-fs");
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    resolve: {
        fallback: {
            assert: require.resolve('assert'),
            crypto: require.resolve("stream-browserify"),
            url: require.resolve("url/"),
            path: require.resolve("path-browserify"),
            util: require.resolve("util/"),
            buffer: require.resolve("buffer/"),
            http: require.resolve("stream-http"),
            zlib: require.resolve("browserify-zlib"),
            assert: require.resolve("assert/"),
            os: require.resolve("os-browserify/browser"),
            https: require.resolve("https-browserify"),
            net: require.resolve("net-browserify"),
            fs: false,
        },
    },
    plugins: [
        new webpack.ProvidePlugin({
            fs: 'memory-fs' // use memory-fs as a polyfill for fs
        })
    ]
};