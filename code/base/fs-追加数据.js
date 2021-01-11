const fs = require('fs');

fs.readFile('./src/writeFile.txt', 'utf8', function (err, data) {
    if (!err) {
        var newStr = data + 'append';
        fs.writeFile('./src/writeFile.txt', newStr, function (err, data) {
            if (!err) {
                console.log("append success");
            } else {
                console.log(err);
            }
        })
    }else {
        console.log(err);
    }
})