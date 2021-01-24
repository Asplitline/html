const path = require('path')
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    // 添加规则
    module: {
        rules: [
            { // css
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'], //逆序执行
            },
            { // 图片
                test: /\.(png|svg|jpg|gif)$/i,
                type: 'asset/resource',
            },
            { // 字体
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource'
            },
            { // 数据
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader'],
            },
            { // xml
                test: /\.xml$/i,
                use: ['xml-loader'],
            },

        ]
    }
}