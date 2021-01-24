const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // 生成环境
    mode: 'development',
    entry: {
        index: './src/index.js',
        print: './src/print.js',
    },
    // 更容易地追踪 error 和 warning
    devtool: 'inline-source-map',
    devServer: {
        // 将dist目录下文件移到 localhost:8080下
        // 不会写入到任何输出文件，将bundle文件保留在内存中
        contentBase: './dist',
    },
    plugins: [
        // new CleanWebpackPlugin(),
        // 不自动移除无用文件
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({
            title: 'Development',
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // 在 server 脚本使用 publicPath
        // 以确保文件资源能够正确地 serve 在 http://localhost:3000
        publicPath: '/',
    },
};