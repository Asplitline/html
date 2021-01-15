const fs = require('fs');

let promise = new Promise((resolve, reject) => {
    fs.readFile('./src/async-a.txt', 'utf-8', (err, data) => {
        if (err) reject(err);
        else resolve(data);
    })
})

promise.then(rs => {
    console.log(rs);
}).catch(err => {
    console.log(err);
})