const path = require('path');
const merge = require('webpack-merge');
const base = require('../../webpack.config');

module.exports = merge(base, {
    context: path.resolve(__dirname, ''),
    entry: {
        main: './index.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['css-loader']
            }
        ]
    }
});
