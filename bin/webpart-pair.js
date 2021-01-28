#!/usr/bin/env node

//用法：
//  webpart pair [id] 把 js 模块和 html 模块作匹配。
//参数：
//  [id] 可选，要匹配的特定模块 id。
//示例：
//  webpart pair        
//  webpart pair API
//强依赖配置节点：
//  stat


const Program = require('./lib/Program');
const Stat = require('./lib/Stat');
const Pair = require('./pair/Pair');


let { args, config, } = Program.parse({
    'config': true,
});

let id = args[0];
let { moduleStat, htmlStat, } = Stat.parse(config.stat);


Pair.match(moduleStat, htmlStat, id);


