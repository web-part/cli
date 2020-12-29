#!/usr/bin/env node
require('colors');

const { program, } = require('commander');
const stat = require('@webpart/stat');
const File = require('@definejs/file');
const Tree = require('./stat/Tree');
const Config = require('../modules/Config');


program.option('--config <file>', 'use a specific config file.');
program.option('--info <file>', 'stat modules and output their infos as JSON file.')
program.option('--list [file]', 'stat modules and output their ids as a list.');
program.option('--tree [file]', 'stat modules and output their ids ad a tree.');
program.parse(process.argv);




let opts = program.opts();
let config = Config.use('stat', opts);
let infos = stat(config);

//抽取出所有的 id。
let ids = infos.reduce((ids, info, index) => {
    let { file, modules, } = info;

    let list = modules.map((module) => {
        return module.id;
    });

    return [...ids, ...list,];
}, []);

ids = ids.sort();

//指定了 `--info` 选项。
if (opts.info) {
    let file = opts.info;
    File.writeSortJSON(file, infos);
}


//指定了 `--list` 选项。
if (opts.list) {
    let file = opts.list;
    if (typeof file == 'string') {
        File.writeJSON(file, ids);
    }
    else {
        ids.forEach((id) => {
            console.log(id.green);
        });
    }

}

//指定了 `--tree` 选项。
if (opts.tree) {
    let file = opts.tree;
    let tree = Tree.get(ids);

    if (typeof file == 'string') {
        File.write(file, tree);
    }
    else {
        console.log(tree);
    }
}




