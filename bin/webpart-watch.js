#!/usr/bin/env node

//用法：
//  webpart watch   编译整个网站项目，完成后开启对文件进行监控。
//选项：
//  -c, --compat    使用兼容模式。 主要针对低版本的 IE。
//  -p, --pack      使用分包模式。 把相关的资源打包成一个独立的分包以用于懒加载。
//示例：
//  webpart watch
//  webpart watch --compat
//  webpart watch --pack
//  webpart watch --compat --pack
//强依赖配置节点：
//  watch
//  master
//  onRun


const master = require('@webpart/master');
const Program = require('./lib/Program');


let { opts, config, } = Program.parse({
    'config': true,
    '-c, --compat': 'compile with compat mode for IE.',
    '-p, --pack': 'pack related files to packages for lazyload.',
});

let defaults = config.watch['defaults'] || config.master['defaults'];
let options = config.watch['watch'];



//命令中指定了使用独立打包的方式，合并相应的配置。
if (opts.pack) {
    let defaultsPack = config.watch['defaults.pack'] || config.master['defaults.pack'];

    Object.assign(defaults.packages, defaultsPack.packages);
    Object.assign(options, config.watch['watch.pack']);
}



master.config(defaults);

//给外部一个机会来执行其它操作，如绑定 master 的各种事件。
if (config.onRun && config.onRun.watch) {
    config.onRun.watch(master);
}

master.on('init', function (website) {
    let mode = opts.compat ? 'compat' : 'normal';           //compat: 兼容模式。 normal: 标准模式。
    let { watch, } = require(`@webpart/process-${mode}`);

    watch(website);
});

master.on('done', function () { 

});

master.watch(options);