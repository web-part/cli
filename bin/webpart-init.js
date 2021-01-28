#!/usr/bin/env node

//用法：
//  webpart init <template-name> [project-name] 使用指定的模板初始化一个项目。
//参数：
//  <template-name> 必选，要使用的模板。 可用的值有 `mobile`、`pc`、`compat`。
//  [project-name]  可选，要新建的项目名称。 如果指定，则在当前目录下新建一个子目录作为项目专用目录。
//示例：
//  webpart init pc
//  webpart init pc pc-demo
//  webpart init mobile
//  webpart init mobile mobile-demo

const Program = require('./lib/Program');
const NPM = require('./init/NPM');

let { opts, args, program, } = Program.parse({
    'config': false, //不需要读取（依赖）配置文件。
    '<template-name> [project-name]': true,
    '-f, --force': 'force to clear the dest project directory when it is not empty.',
});


if (args.length < 1) {
    return program.help();
}

let template = args[0];
let project = args[1];

NPM.download(template, project, opts.force);


