
require('colors');

const path = require('path');
const program = require('commander');
const master = require('@webpart/master');

function require_cwd(file) {
    let cwd = process.cwd();
    let dest = path.join(cwd, file);
    
    return require(dest);
}

program.option('-c, --compat', 'compile with compat mode for IE.');
program.option('-p, --pack', 'pack related files to packages for lazyload.');
program.parse(process.argv);


let defaults = require_cwd('./config/defaults');
let options = require_cwd('./config/watch');
let opts = program.opts();

// console.log(opts);

//命令中指定了使用独立打包的方式，加载相应的配置。
if (opts.pack) {
    let p1 = require_cwd('./config/defaults.pack');
    let p2 = require_cwd('./config/watch.pack.js');

    Object.assign(defaults.packages, p1.packages);
    Object.assign(options, p2);
}

// console.log('defaults', defaults);
// console.log('options', options);

master.config(defaults);


master.on('init', function (website) {
    let mode = opts.compat ? 'compat' : 'normal';           //compat: 兼容模式。 normal: 标准模式。
    let { watch, } = require(`@webpart/process-${mode}`);

    watch(website);
});

master.on('done', function () {
    console.log('done'.magenta);
});

master.watch(options);