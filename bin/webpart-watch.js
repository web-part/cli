
require('colors');

const program = require('commander');
const master = require('@webpart/master');
const Config = require('../modules/Config');

program.option('-c, --compat', 'compile with compat mode for IE.');
program.option('-p, --pack', 'pack related files to packages for lazyload.');
program.option('--config <file>', 'use a specific config file.');
program.parse(process.argv);




let opts = program.opts();
let config = Config.use('watch', opts);
let onRun = Config.get('onRun');
let defaults = config['defaults'];
let options = config['watch'];




//命令中指定了使用独立打包的方式，合并相应的配置。
if (opts.pack) {
    Object.assign(defaults.packages, config['defaults.pack'].packages);
    Object.assign(options, config['watch.pack']);
}



master.config(defaults);

//给外部一个机会来执行其它操作，如绑定 master 的各种事件。
if (onRun && onRun.watch) {
    onRun.watch(master);
}

master.on('init', function (website) {
    let mode = opts.compat ? 'compat' : 'normal';           //compat: 兼容模式。 normal: 标准模式。
    let { watch, } = require(`@webpart/process-${mode}`);

    watch(website);
});

master.on('done', function () { 

});

master.watch(options);