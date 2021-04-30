const path = require('path')
const fs = require('fs')
const glob = require('glob')

function getEntry() {
    const entry = {}
    glob.sync('./src/*/*.js')
        .forEach(filePath => {
            let name = filePath.match(/\/src\/(.+)\/*.js/)
            if (!fs.existsSync('./src/' + name[1] + '.html')) {
                return;
            }
            entry[name[1]] = filePath;
            console.log(entry);
        })
}

getEntry()
const config = {
    mode: 'development',
    context: path.resolve(__dirname),
    entry: {
        index: './src/pages/index.js',
        about: './src/pages/about.js',
    },
    output: {
        filename: 'assets/js/[name].[hash:8].js',
        path: path.resolve(__dirname, './dist')
    },
    resolve: {},
    module: {},
    plugins: [],
}
// 

// 
module.exports = config

