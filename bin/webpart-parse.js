#!/usr/bin/env node

//用法：
//  webpart parse   解析整个网站项目。
//选项：
//  -p, --pack      使用分包模式。 把相关的资源打包成一个独立的分包以用于懒加载。
//示例：
//  webpart parse
//  webpart parse --pack
//强依赖配置节点：
//  master
//  masterEvents

const File = require('@definejs/file');
const master = require('@webpart/master');
const Program = require('./lib/Program');


let { opts, config, } = Program.parse({
    'config': true,
    '-p, --pack': 'pack related files to packages for lazyload.',
    '-o, --output <output>': 'output the result json file.',
});

let defaults = config.master[''];
let events = config.masterEvents || {};
let parseConfig = config.parse || {};
let file = opts.output || parseConfig.file; //优先用命令行输入的文件名。


//命令中指定了使用独立打包的方式，合并相应的配置。
if (opts.pack) {
    let defaultsPack = config.master['.pack'];

    Object.assign(defaults.packages, defaultsPack.packages);
}

master.config(defaults);    //
master.on(events);          //给外部一个机会来执行其它操作，如绑定 master 的各种事件。

let website = master.init();
website.parse();


let json = website.toJSON();

if (file) {
    File.writeJSON(file, json);
}
else {
    console.log(json);
}
