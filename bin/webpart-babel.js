#!/usr/bin/env node

//用法：
//  webpart babel <src-file> [dest-file]  把指定的源文件作 babel 转码后输出到目标文件。
//参数：
//  <src-file>  必选，源文件名。
//  [dest-file] 可选，要输出的目标文件名。
//示例：
//  webpart babel test.js
//  webpart babel test.js test.babel.js
//依赖包：
//@babel/core
//@babel/preset-env。



const console = require('@webpart/console');
const fs = require('fs');
const Program = require('./lib/Program');
const babel = require('@webpart/process-babel');
const Dest = require('./babel/Dest');


let { opts, args, program, } = Program.parse({
    'config': undefined, //可以有。 如果有则用，否则不要求。
    '<src-file> [dest-file]': '',
    '-f, --force': 'force to overwite the dest file when it is existed.',
});

if (args.length < 1) {
    return program.help();
}

let src = args[0];
let dest = args[1];

if (!dest) {
    dest = Dest.get(src);
}

if (!fs.existsSync(src)) {
    console.log(`Not Found:`.bold.red, `${src}`.underline.red);
    return;
}

//没有显式指定要强制覆盖，且已存在目标文件。
if (!opts.force && fs.existsSync(dest)) {
    console.log(`File Existed:`.red, `${dest}`.underline.cyan);
    console.log(`Use option '-f, --force' to overwrite the dest file if you want.`.red);
    return;
}




babel.transformFile(src, dest);





