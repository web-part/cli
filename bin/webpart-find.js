#!/usr/bin/env node

//用法：
//  webpart find [id]   查找模块。
//选项：
//  -a, --all       使用模糊匹配模式来查找全部相关的模块。 
//  -r, --repeat    查找重复定义的模块或一个文件里定义了多个模块的文件。
//示例：
//  webpart find API
//  webpart find API --all
//  webpart find --repeat
//  webpart find API --repeat
//强依赖配置节点：
//  stat


const Program = require('./lib/Program');
const Stat = require('./lib/Stat');
const Find = require('./find/Find');


let { opts, args, config, program, } = Program.parse({
    'config': true,
    '[id]': '',
    '-a, --all': 'find all mdoules to files.',
    '-r, --repeat': 'find repeated mdoules to files.',
});



let id = args[0];

let { moduleStat, htmlStat, } = Stat.parse(config.stat);
let { file$id, id$file, } = moduleStat;

if (opts.repeat) {
    Find.repeat(id$file, id);
    console.log(``);
    Find.repeat(file$id, id);
    return;
}

if (!id) {
    return program.help();
}

if (opts.all !== undefined) {
    Find.all(id$file, id);
    return;
}           

Find.exact(id$file, id);
