const fs = require('fs');

fs.readFile('./src/test.json', 'utf8', function (err, data) {
    if (!err) {

        var arr = JSON.parse(data);
        var newArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id != 2) {
                newArr.push(arr[i]);
            }
        }
        var newJson = JSON.stringify(newArr);
        fs.writeFile('./src/test.json', newJson, function (err) {
            if (!err) {
                console.log("delete success");
            } else {
                console.log(err);
            }
        })
    } else {
        console.log(err);
    }
})