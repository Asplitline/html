const exp = require('./collection');

// 查找并删除 返回删除数据
/* exp.findOneAndDelete({_id:'5ffc0e42762a4d3f7cb89284'})
.then(data=>console.log(data))
.catch(err=>console.log(err)); */

// 删除所有 { n: 2, ok: 1, deletedCount: 2 }
// exp.deleteMany().then(data => console.log(data));

// 更新一条数据 { n: 1, nModified: 1, ok: 1 }
/* exp.updateOne({ author: 'lisi' }, { name: 'javascript' })
    .then(data => console.log(data)); */

// 更新所有数据 { n: 3, nModified: 1, ok: 1 }
/* exp.updateMany({ isPublished: false })
    .then(data => console.log(data)) */