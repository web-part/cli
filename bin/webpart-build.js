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
//  onRun



const master = require('@webpart/master');
const Program = require('./lib/Program');

let { opts, config, } = Program.parse({
    'config': true,
    '-c, --compat': 'compile with compat mode for IE.',
    '-p, --pack': 'pack related files to packages for lazyload.',
});

let defaults = config.build['defaults'] || config.master['defaults'];
let options = config.build['build'];


//命令中指定了使用独立打包的方式，合并相应的配置。
if (opts.pack) {
    let defaultsPack = config.build['defaults.pack'] || config.master['defaults.pack'];

    Object.assign(defaults.packages, defaultsPack.packages);
    Object.assign(options, config.build['build.pack']);
}

//增加额外的配置。
{
    //compat: 兼容模式。 
    //normal: 标准模式。
    let mode = opts.compat ? 'compat' : 'normal';           

    //增加额外的 excludes，即构建前要排除在外的文件或目录。
    let excludes = config.build[`build.${mode}`].excludes || [];

    options.excludes = [
        ...options.excludes,
        ...excludes,
    ];
}




master.config(defaults);

//给外部一个机会来执行其它操作，如绑定 master 的各种事件。
if (config.onRun && config.onRun.build) {
    config.onRun.build(master);
}


master.on('init', function (website) {
    let mode = opts.compat ? 'compat' : 'normal';           //compat: 兼容模式。 normal: 标准模式。
    let { build, } = require(`@webpart/process-${mode}`);

    build(website);
});

master.on('done', function () {
    
});

master.build(options);