let lineReader = require('line-reader');
Promise = require('bluebird');

let eachLine = Promise.promisify(lineReader.eachLine);
const regExp = /\[.*\]/;
let flag;

let controller = {
    lines: [],
    text: []
}

function parseConfig(controller) {
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
                controller.lines.push(line);
                break;
            case 'text':
                controller.text.push(line);
                break;
            default: console.log('error');
        }
    }).then(()=>{
        console.log(controller.lines);
    })
}

parseConfig(controller);

