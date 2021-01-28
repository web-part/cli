#!/usr/bin/env node


//用法：
//  webpart list [id]   默认显示指定 id 或所有的模块列表。
//参数：
//  [id]    可选，要过滤显示的模块 id 子串。
//选项：
//  -f, --file      显示模块所在的文件。
//  -i, --index     显示列表的序号。
//示例：
//  webpart list
//  webpart list --index
//  webpart list --file
//  webpart list --file --index
//  webpart list API
//  webpart list API --index
//  webpart list API --file
//  webpart list API --file --index
//强依赖配置节点：
//  stat



const Program = require('./lib/Program');
const Stat = require('./lib/Stat');
const List = require('./list/List');



let { opts, config, args, } = Program.parse({
    'config': true,
    '-f, --file': 'show file.',
    '-i, --index': 'show index.',
});

let node = args[0];
let { moduleStat, htmlStat, } = Stat.parse(config.stat);
let { ids, id$file, } = moduleStat;


List.render({
    'ids': ids,
    'id$file': id$file,
    'node': node,
    'showFile': opts.file,
    'showIndex': opts.index,
});

