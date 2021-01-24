const path = require('path')

module.exports = {
    mode: 'development', // 构建开发模式 
    // product-构建生产模式
    entry: path.join(__dirname, './src/index.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    }
}