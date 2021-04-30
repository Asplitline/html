const path = require('path')


/* module.exports = {
    mode: 'development', // 构建开发模式 
    entry: {
        // 1.入口起点 
        // index another中都由lodash，重复引用
        // index: './src/index.js',
        // another: './src/another-module.js'
        // 2.防止重复
        // 2.1 入口依赖 deepOn
        index: {
            import: './src/index.js',
            dependOn: 'shared'
        },
        another: {
            import: './src/another-module.js',
            dependOn: 'shared'
        },
        shared: 'lodash'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        // 一个 HTML 页面上使用多个入口时
        runtimeChunk: 'single'
    }
} */

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 2.2 SplitChunksPlugin 
/* module.exports = {
    mode: 'development', // 构建开发模式 
    entry: {
        index: './src/index.js',
        another: './src/another-module.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
    ]

} */

// 3.动态导入
module.exports = {
    mode: 'development', // 构建开发模式 
    entry: {
        index: './src/index.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CleanWebpackPlugin(),
    ]
}