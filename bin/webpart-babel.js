
require('colors');

const fs = require('fs');
const path = require('path');
const program = require('commander');
const inquirer = require('inquirer');
const babel = require('@webpart/process-babel');

program.usage('<src-file-name> [dest-file-name]');
// program.option('-m, --minify', 'minify javascript content.');
program.option('-f, --force', 'force overwite the dest file when it is existed.');

program.parse(process.argv);

if (program.args.length < 1) {
    return program.help();
}



let opts = program.opts();
let src = program.args[0];
let dest = program.args[1] || getDest(src);


//没有显式指定要强制覆盖，且已存在目标文件，则弹出确认提示。
if (!opts.force && fs.existsSync(dest)) {
    console.log('dest file'.yellow, dest.magenta, 'is already existed.'.yellow);
    prompt(doBabel);
}
else {
    doBabel();
}

//真正做 babel 转换的函数。
function doBabel() {
    babel.transformFile(src, dest);
}

//根据输入的源文件名自动计算出对应的目标文件名。
//主要想在保留 `.debug.js` 或 `.min.js` 的提下，生成 `.babel.debug.js` 或 `.babel.min.js`。
function getDest(src) {
    let originExt = path.extname(src);          //如 `.js`。
    let debugExt = '.debug' + originExt;        //如 `.debug.js`。
    let minExt = '.min' + originExt;            //如 `.min.js`。
    let ext =
        src.endsWith(debugExt) ? debugExt :
        src.endsWith(minExt) ? minExt :
        originExt;
    
    let pos = 0 - ext.length;               //如 -9。
    let ext2 = '.babel' + ext;              //如 `.babel.debug.js`。
    let dest = src.slice(0, pos) + ext2;    //如 `f/kisp/kisp.babel.debug.js`。

    return dest;


}

//存在目标文件时，询问是否覆盖。
function prompt(next) {
    inquirer.prompt([
        {
            name: 'overwrite',
            type: 'input',
            message: 'overwrite? ' + 'Y/N'.cyan,
        },
    ]).then((answer) => {
        let { overwrite, } = answer;

        overwrite = overwrite.toUpperCase();

        if (overwrite == 'N') {
            return;
        }

        if (overwrite == 'Y') {
            next();
        }
        else {
            prompt();
        }
    });
}

