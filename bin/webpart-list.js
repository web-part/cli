#!/usr/bin/env node
require('colors');


const { program, } = require('commander');
const { execFile, execFileSync, } = require('child_process');

program.parse(process.argv);


let id = program.args[0];
let args = ['stat', '--list',];

if (id) {
    args = [...args, id,];
}


//实际调用的是 `webpart stat --tree [id]` 之类的。
execFile('webpart', args, function (error, stdout) {
    if (error) {
        console.log(error.message.red);
        return;
    }

    console.log(stdout);
});
