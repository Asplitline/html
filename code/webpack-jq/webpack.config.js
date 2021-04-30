const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 清除dist插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// css导出分离导出插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
module.exports = {
    // entry - output 基于context
    context: path.resolve(__dirname),
    entry: {
        index: './src/index.js',
        about: './src/about.js',
        'production/index': './src/production/index.js'
    },
    output: {
        path: path.resolve('./dist'),
        // 将js文件导出到 asset/js
        filename: 'assets/js/[name]-[hash].js',
        // 图片导出到assets/img
        assetModuleFilename: 'assets/img/[hash][ext][query]',
        // 必须添加publicPath , Automatic publicPath is not supported in this browser
        publicPath: '/'
    },
    resolve: {},
    module: {
        rules: [
            {
                test: /\.css$/i,
                // 将style-loader替换
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/i,
                type: 'asset/resource',
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            // css文件导出到 assets/css
            filename: 'assets/css/[name]_[hash].css'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/index.html',
            favicon: './public/favicon.ico',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            filename: 'about.html',
            template: './public/about.html',
            favicon: './public/favicon.ico',
            chunks: ['about']
        }),
        new HtmlWebpackPlugin({
            filename: 'production/index.html',
            template: './public/production/index.html',
            favicon: './public/favicon.ico',
            chunks: ['production/index']
        })
    ],
    optimization: {
        // 压缩css文件
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
        ],
        // 提取公共模块，包括第三方库和自定义工具库等
        splitChunks: {
            chunks: 'all',// async表示抽取异步模块，all表示对所有模块生效，initial表示对同步模块生效
            cacheGroups: {
                vendors: {// 抽离第三方插件
                    test: /[\\/]node_modules[\\/]/,// 指定是node_modules下的第三方包
                    name: 'vendors',
                    priority: -10 // 抽取优先级
                },
                utilCommon: { // 抽离自定义的公共库
                    name: 'common',
                    minSize: 0,
                    minChunks: 2,//引用了多少次，才能分离生成新chunk
                    priority: -20
                }
            }
        },
        runtimeChunk: {
            name: 'mainfest',
        }
    }
}