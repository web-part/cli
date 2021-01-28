#!/usr/bin/env node

//用法：
//  webpart info <id>   显示指定模块的信息。
//参数：
//  <id>    必选，要显示的模块 id。
//示例：
//  webpart info API
//强依赖配置节点：
//  stat


const Program = require('./lib/Program');
const Stat = require('./lib/Stat');
const Info = require('./info/Info');


const { config, args, program, } = Program.parse({
    'config': true,
    '<id>': '',
});


if (args.length < 1) {
    return program.help();
}

let id = args[0];
let { moduleStat, htmlStat, } = Stat.parse(config.stat);

Info.render(moduleStat, id);