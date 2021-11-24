const fs = require('fs');
const path = require('path');
// 源目录
const root = 'G:/bilibili_file/video/65287512'
const files = fs.readdirSync(root)
// 目的文件名
const dirname = 'houdunren_position'
// 目的目录
const to = path.resolve('G:/bilibili_file/s_video/', dirname)
// 已备份文件
const temp = path.resolve('G:/bilibili_file/s_video/temp')

_mkdir(to)
_mkdir(temp)

const dirs = files.filter((i, key) => {
    return fs.statSync(path.resolve(root, i)).isDirectory()
})
dirs.forEach((i, key) => {
    const dir_root = path.resolve(root, i)
    const _dirs = fs.readdirSync(dir_root)
    const [fileName, , video] = _dirs
    fs.readFile(path.resolve(dir_root, fileName), 'UTF-8', (err, data) => {
        let {
            PartName,
            Title,
            Aid
        } = JSON.parse(data)
        _mkdir(path.resolve(temp, Aid))
        const oldPath = path.resolve(dir_root, video)
        const ext = path.extname(oldPath)
        const newPath = `${path.resolve(to, _handleSpace(PartName))}`
        fs.copyFile(oldPath, newPath + '.' + ext, err => {
        // fs.rename(oldPath, newPath + '.' + ext, err => {
          err && console.log(err);
        })
    })
})

function _handleSpace (str) {
    const invalidate = '~!@#$%^&*，。；‘’\\{【】[]}|'
    const s = str.replace(/\s*/g, '')
    return s.split('').filter(i => !invalidate.includes(i)).join('')
}

function _mkdir (path) {
    if (!fs.existsSync(path)) {
        console.log(path);
        fs.mkdir(path, err => err && console.log(err))
    }
}