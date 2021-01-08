
require('colors');

const program = require('commander');
const master = require('@webpart/master');
const Config = require('./lib/Config');



program.option('-c, --compat', 'compile with compat mode for IE.');
program.option('-p, --pack', 'pack related files to packages for lazyload.');
program.option('--config <file>', 'use a specific config file.');
program.parse(process.argv);




let opts = program.opts();
let config = Config.use('build', opts);
let configMaster = Config.use('master');
let onRun = Config.get('onRun');
let defaults = config['defaults'] || configMaster['defaults'];
let options = config['build'];


//命令中指定了使用独立打包的方式，合并相应的配置。
if (opts.pack) {
    let defaultsPack = config['defaults.pack'] || configMaster['defaults.pack'];

    Object.assign(defaults.packages, defaultsPack.packages);
    Object.assign(options, config['build.pack']);
}

//增加额外的配置。
{
    //compat: 兼容模式。 
    //normal: 标准模式。
    let mode = opts.compat ? 'compat' : 'normal';           

    //增加额外的 excludes，即构建前要排除在外的文件或目录。
    let excludes = config[`build.${mode}`].excludes || [];

    options.excludes = [
        ...options.excludes,
        ...excludes,
    ];
}




master.config(defaults);

//给外部一个机会来执行其它操作，如绑定 master 的各种事件。
if (onRun && onRun.build) {
    onRun.build(master);
}


master.on('init', function (website) {
    let mode = opts.compat ? 'compat' : 'normal';           //compat: 兼容模式。 normal: 标准模式。
    let { build, } = require(`@webpart/process-${mode}`);

    build(website);
});

master.on('done', function () {
    
});

master.build(options);