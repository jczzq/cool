/**
 * webpack v4.15.1
 * doc url: http://webpack.css88.com/concepts/loaders.html
 */
console.log('__dirname', __dirname);
module.exports = {
    mode: 'none',
    entry: {
        main: './webpack/loader/index.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/webpack/loader'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'to-string-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,        // 是否启用url(), 类似于 url(image.png)` => `require('./image.png')
                            import: true,     // 是否启用@import()加载样式
                            modules: false
                        }
                    }
                ]
            }
        ]
    }
};
