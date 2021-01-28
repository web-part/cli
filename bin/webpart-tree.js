#!/usr/bin/env node

//用法：
//  webpart tree [id]
//参数：
//  [id]    可选，要显示的指定的模块 id。
//选项：
//  --file  显示模块的在的文件路径。
//示例：
//  webpart tree                显示所有模块的树形结构图。
//  webpart tree API            显示 API 模块下的子树结构图。
//  webpart tree --file
//  webpart tree API --file
//强依赖配置节点：
//  stat


const Program = require('./lib/Program');
const Stat = require('./lib/Stat');
const Tree = require('./tree/Tree');


let { opts, config, args, } = Program.parse({
    'config': true,
    '--file': 'show files.',
});


let id = args[0];
let { moduleStat, htmlStat, } = Stat.parse(config.stat);
let { ids, id$file, } = moduleStat;
let obj = opts.file ? id$file : null;

Tree.render(ids, id, obj);