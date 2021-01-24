const express = require("express")
const webpack = require("webpack")
const webpackDevMiddleware = require("webpack-dev-middleware")

const app = express()

const config = require('./webpack.config.js')

const compiler = webpack(config)

// 使用webpack-dev-middleware
// 将webpack.config.js配置文件作为基础配置
app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
    })
)

app.listen(3000, function () {
    console.log('Example app listening on port 3000!\n');
})