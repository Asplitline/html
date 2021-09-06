const fs = require('fs');
const fetch = require('./lib/node-fetch.js')
// 
// 改名文件
const path = './download'

const files = fs.readdirSync(path)

const end_file = files.filter(i => i != 'app.js')

console.log(end_file);

const apis = end_file.map(i => {
  return _get(i)
})

Promise.all(apis).then(res => {
  let arrs = res.map(i => ({ aid: i.data.aid, title: i.data.title }))
  console.log(arrs);
  fs.writeFileSync('./info.json', JSON.stringify(arrs))
  // bulk name change
  // arrs.forEach(i => {
  //   rename(i.aid, i.title, path + '/')
  //   // rename(i.title, i.aid, path + '/')
  // })
}).catch(err => {
  console.log(err);
})


async function _get (aid = '56582999') {
  const res = await fetch('http://api.bilibili.com/x/web-interface/view?aid=' + aid)
  return res.json()
}


function rename (oldPath, newPath, root = './') {
  fs.renameSync(root + oldPath, root + newPath)
}