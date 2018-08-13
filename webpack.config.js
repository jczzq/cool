/**
 * webpack v4.15.1
 * doc url: http://webpack.css88.com/concepts/loaders.html
 */
module.exports = {
    module: {
        rules: [
            { test: /\.css$/, use: 'css-loader' }
        ]
    }
};