const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    // 两个入口文件，两个出口文件
    entry: {
        index: './src/index.js',
        print: './src/print.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [ // 带s
        // 每次构造前清理 /dist
        new CleanWebpackPlugin(),
        // 生成index.html
        new HtmlWebpackPlugin({
            title: '管理输出'
        })
    ]

}