#!/usr/bin/env node

//用法：
//  webpart md5 [patterns]  显示当前工作目录下指定模式的所有文件的 md5 值。
//参数：
//  [patterns] 可选，模式列表。
//选项：
//  -r, --repeat    仅显示内容重复的文件，用来查找重复文件非常有用。
//示例：
//  webpart md5                     默认显示当前工作目录的所有文件的 md5 值。
//  webpart md5 htdocs              显示 htdocs 下的所有文件的 md5 值。
//  webpart md5 htdocs/**/*.js      显示 htdocs 下的所有 js 文件的 md5 值。
//  webpart md5 htdocs --repeat     显示 htdocs 下的所有 js 文件的重复的 md5 值。



const Program = require('./lib/Program');
const Files = require('./md5/Files');
const App = require('./md5/App');


let { opts, args, } = Program.parse({
    'config': false,
    '-r, --repeat': 'show repeat only.', //仅显示内容重复的文件。
});

if (args.length == 0) {
    args = [process.cwd()];
}

let files = Files.get(args);

App.render(files, opts.repeat);


