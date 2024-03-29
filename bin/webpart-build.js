#!/usr/bin/env node

//用法：
//  webpart build   编译整个网站项目以用于生产环境。
//选项：
//  -c, --compat    使用兼容模式。 主要针对低版本的 IE。
//  -p, --pack      使用分包模式。 把相关的资源打包成一个独立的分包以用于懒加载。
//示例：
//  webpart build
//  webpart build --compat
//  webpart build --pack
//  webpart build --compat --pack
//强依赖配置节点：
//  build
//  master
//  masterEvents



const master = require('@webpart/master');
const Program = require('./lib/Program');

let { opts, config, } = Program.parse({
    'config': true,
    '-c, --compat': 'compile with compat mode for IE.',
    '-p, --pack': 'pack related files to packages for lazyload.',
    '-e, --env <name>': 'use enviroment.',
});

let defaults = config.master[''];
let options = config.build[''];
let events = config.masterEvents || {};

//优先使用命令行中输入的值。
options.env = opts.env || config.build.env || config.master.env;

//命令中指定了使用独立打包的方式，合并相应的配置。
if (opts.pack) {
    let defaultsPack = config.master['.pack'];

    Object.assign(defaults.packages, defaultsPack.packages);
    Object.assign(options, config.build['.pack']);
}

//增加额外的配置。
{
    //compat: 兼容模式。 
    //normal: 标准模式。
    let mode = opts.compat ? 'compat' : 'normal';           

    //增加额外的 excludes，即构建前要排除在外的文件或目录。
    let excludes = config.build[`.${mode}`].excludes || [];

    options.excludes = [
        ...options.excludes,
        ...excludes,
    ];
}

master.config(defaults);    //
master.on(events);          //给外部一个机会来执行其它操作，如绑定 master 的各种事件。

master.on('init', function (website) {
    let mode = opts.compat ? 'compat' : 'normal';           //compat: 兼容模式。 normal: 标准模式。
    let process = require(`@webpart/process-${mode}`);

    process.build(website);
});

master.on('done', 'build', function (website) {
    
});

master.build(options);