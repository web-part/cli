#!/usr/bin/env node

//该命令是 webpart watch 的一个子版本。
//用于仅编译网站项目，但完成后不开启监控。
//在某些场景下，可能需要仅编译但不开启监控。

//用法：
//  webpart compile   编译整个网站项目。
//选项：
//  -c, --compat    使用兼容模式。 主要针对低版本的 IE。
//  -p, --pack      使用分包模式。 把相关的资源打包成一个独立的分包以用于懒加载。
//示例：
//  webpart compile
//  webpart compile --compat
//  webpart compile --pack
//  webpart compile --compat --pack
//强依赖配置节点：
//  compile
//  master
//  masterEvents

const master = require('@webpart/master');
const Program = require('./lib/Program');


let { opts, config, } = Program.parse({
    'config': true,
    '-c, --compat': 'compile with compat mode for IE.',
    '-p, --pack': 'pack related files to packages for lazyload.',
});

let defaults = config.master[''];
let options = config.compile[''];
let events = config.masterEvents || {};



//命令中指定了使用独立打包的方式，合并相应的配置。
if (opts.pack) {
    let defaultsPack = config.master['.pack'];

    Object.assign(defaults.packages, defaultsPack.packages);
    Object.assign(options, config.compile['.pack']);
}

master.config(defaults);    //
master.on(events);          //给外部一个机会来执行其它操作，如绑定 master 的各种事件。

master.on('init', function (website) {
    let mode = opts.compat ? 'compat' : 'normal';           //compat: 兼容模式。 normal: 标准模式。
    let process = require(`@webpart/process-${mode}`);

    process.watch(website);
});

master.on('done', 'compile', function (website) {

});


master.compile(options);