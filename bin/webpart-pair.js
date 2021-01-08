#!/usr/bin/env node
require('colors');


const { program, } = require('commander');
const { execFile, execFileSync, } = require('child_process');



program.parse(process.argv);


let opts = program.opts();
let id = program.args[0];
let cmd = '--pair';
let args = ['stat', cmd,];

if (id !== undefined) { //此处允许空字符串。
    args = [...args, id,];
}


//实际调用的是 `webpart stat --pair <id>` 之类的。
execFile('webpart', args, function (error, stdout) {
    if (error) {
        console.log(error.message.red);
        return;
    }
    
    console.log(stdout);

});
