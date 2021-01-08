#!/usr/bin/env node
require('colors');


const { program, } = require('commander');
const { execFile, execFileSync, } = require('child_process');

program.option('-a, --all', 'find all mdoules to files.');
program.option('-r, --repeat', 'find repeated mdoules to files.');

program.parse(process.argv);


let opts = program.opts();
let id = program.args[0];
let cmd = '--find';

if (opts.all) {
    cmd += '-all';
}
else if (opts.repeat) {
    cmd += '-repeat';
}


    
let args = ['stat', cmd,];

if (id !== undefined) { //此处允许空字符串。
    args = [...args, id,];
}


//实际调用的是 `webpart stat --find-all <id>` 之类的。
execFile('webpart', args, function (error, stdout) {
    if (error) {
        console.log(error.message.red);
        return;
    }
    
    console.log(stdout);

});
