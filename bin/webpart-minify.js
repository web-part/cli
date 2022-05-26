#!/usr/bin/env node

//用法：
//  webpart minify <src-file> [dest-file] 压缩指定的源文件，并输出到目标文件（如果指定）。
//参数：
//  <src-file>  必选，要压缩的源文件。
//  [dest-file] 可选，要输出的目标文件。 如果没有指定，则自动带上 `.min` 后缀。
//示例：
//  webpart minify index.js
//  webpart minify index.js index.min.js


const console = require('@webpart/console');
const path = require('path');
const master = require('@webpart/master');
const Program = require('./lib/Program');
const File = require('@definejs/file');
const Js = master.require('Js');
const Edition = master.require('Edition');


let { args, } = Program.parse({
    'config': undefined, //可以有。 如果有则用，否则不要求。
    '<src-file>': '',
});


let src = args[0];

if (!src) {
    console.log(`Error:`.bold.red, `missing argument <src-file>`.red)
    return;
}



let cwd = process.cwd();

src = path.join(cwd, src);

let dest = Edition.toMin(src, true);


Js.minify({
    'src': src,
    
    'done': function (code) { 
        File.write(dest, code);

        dest = path.relative(cwd, dest);
        
        console.log(`Write:`.green, `${dest}`.underline.cyan);
    },
});



