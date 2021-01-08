#!/usr/bin/env node
require('colors');

const { program, } = require('commander');
const File = require('@definejs/file');
const Config = require('./lib/Config');
const Stat = require('./lib/Stat');
const Find = require('./stat/Find');
const List = require('./stat/List');
const Tree = require('./stat/Tree');
const Info = require('./stat/Info');
const Pair = require('./stat/Pair');

program.option('--config <file>', 'use a specific config file.');
program.option('--info <id>', 'stat module info with specific id.')
program.option('--list [id]', 'stat modules and output their ids as a list.');
program.option('--tree [id]', 'stat modules and output their ids ad a tree.');
program.option('--find <id>', 'find a module to file.');
program.option('--find-all [id]', 'find all modules to files.');
program.option('--find-repeat');
program.option('--pair [id]');


program.parse(process.argv);



let destDir = program.args[0];  //指定了 `webpart stat` 后面的参数。 如 `webpart stat stat-output`。
let opts = program.opts();
let config = Config.use('stat', opts);  //

let { moduleStat, htmlStat, } = Stat.parse(config, destDir);

let {
    infos,
    ids,
    file$info,
    file$module,
    file$id,
    id$file,
    id$info,
    id$module,
    id$parent,
    id$childs,
    id$children,
    id$siblings,
} = moduleStat;




//指定了 `--info` 选项。
if (opts.info) {
    Info.render(stat, opts.info);
    return;
}


//指定了 `--list` 选项。 
if (opts.list !== undefined) { //此处允许空串。
    List.render(ids, opts.list);
    return;
}

//指定了 `--tree` 选项。 生成树状。
if (opts.tree !== undefined) { //此处允许空串。
    Tree.render(ids, opts.tree);
    return;
}

//指定了 `--find` 选项。 精准查找。
if (opts.find !== undefined) {//此处允许空串。
    Find.exact(id$file, opts.find);
    return;
}

//指定了 `--find-all` 选项。 模糊查找。
if (opts.findAll !== undefined) {
    Find.all(id$file, opts.findAll);
    return;
}

if (opts.findRepeat) {
    console.log(`---- id:file ----`.bold.blue);
    Find.repeatValues(id$file);
    console.log(`---- file:id ----`.bold.blue);
    Find.repeatValues(file$id);
}

//指定了 `--find` 选项。 精准查找。
if (opts.pair !== undefined) {//此处允许空串。
    Pair.match(moduleStat, htmlStat, opts.pair);
    return;
}



