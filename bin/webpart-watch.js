#!/usr/bin/env node

//用法：
//  webpart watch   编译整个网站项目，完成后开启对文件进行监控。
//选项：
//  -c, --compat        使用兼容模式。 主要针对低版本的 IE。
//  -p, --pack          使用分包模式。 把相关的资源打包成一个独立的分包以用于懒加载。
//  -e, --env <name>    使用指定的环境。 如果不指定，则默认 name=`dev`。
//示例：
//  webpart watch
//  webpart watch --compat
//  webpart watch --pack
//  webpart watch --compat --pack
//  webpart watch --env dev|prd
//强依赖配置节点：
//  watch
//  master
//  masterEvents

const master = require('@webpart/master');
const File = require('@definejs/file');
const Program = require('./lib/Program');


let { opts, config, } = Program.parse({
    'config': true,
    '-c, --compat': 'compile with compat mode for IE.',
    '-p, --pack': 'pack related files to packages for lazyload.',
    '-e, --env <name>': 'use enviroment.',
});

let defaults = config.master[''];
let options = config.watch[''];
let events = config.masterEvents || {};

//优先使用命令行中输入的值。
options.env = opts.env || config.watch.env || config.master.env;


//命令中指定了使用独立打包的方式，则合并相应的配置。
if (opts.pack) {
    let defaultsPack = config.master['.pack'];

    Object.assign(defaults['packages'], defaultsPack['packages']);
    Object.assign(options, config.watch['.pack']);
}


master.config(defaults);    //
master.on(events);          //给外部一个机会来执行其它操作，如绑定 master 的各种事件。

master.on('init', function (website) {
    //此处提供静态的 require 语句以用于工具的分析。
    /* require('@webpart/process-compat'); */
    /* require('@webpart/process-normal'); */
    let mode = opts.compat ? 'compat' : 'normal';           //compat: 兼容模式。 normal: 标准模式。
    let process = require(`@webpart/process-${mode}`);      //

    process.watch(website);
    
});


master.on('done', 'watch', function (website) { 
    let { file, } = config.watch;

    //如果指定了路径，则输出信息。
    //在 server 中要用到该监控进程的一些信息。
    if (file) {
        File.writeJSON(file, {
            'process': {
                'time': Date.now(),
                'pid': process.pid,
                'cwd': process.cwd(),
                'argv': process.argv,
                'env': process.env,
            },
        });
    }
});


master.watch(options);