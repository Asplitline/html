const fs = require('fs');

function myRead(path) {
    return new Promise((resolve, reject) => {
        fs.readFile('./src/' + path, 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        })
    })
}
let p = myRead('async-a.txt');

p.then(data => {
    console.log(data);
    return myRead('async-b.txt');
}).then(data => {
    console.log(data);
    return myRead('async-c.txt');
}).then(data => {
    console.log(data);
})