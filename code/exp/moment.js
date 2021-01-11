const moment = require('moment');
const fs = require('fs');

fs.readdir('./', 'utf-8', (err, files) => {
    for (let i = 0; i < files.length; i++) {
        fs.stat('./' + files[i], (err, stats) => {
            let m = moment(stats.mtime).format('YYYY-MM-DD ** hh:mm:ss');
            console.log(files[i], m);
        })
    }
})