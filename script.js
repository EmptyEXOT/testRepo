let lineReader = require('line-reader');
Promise = require('bluebird');

let eachLine = Promise.promisify(lineReader.eachLine);
const regExp = /\[.*\]/;
let flag;
let lines = [];
let text = [];

eachLine('test.txt', function(line) {
    if (line.match(regExp)) {
        switch (line) {
            case '[lines]':
                flag = 'lines'
                break;
            case '[text]':
                flag = 'text';
                break;
            default: console.log('error');
        }
    } else switch (flag) {
        case 'lines':
            lines.push(line);
            break;
        case 'text':
            text.push(line);
            break;
        default: console.log('error');
    }
}).then(()=>{
    for (let i = 0; i<lines.length; i++) {
        console.log(lines[i]);
    }
})
