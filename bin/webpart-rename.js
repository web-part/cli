#!/usr/bin/env node
require('colors');

const { program, } = require('commander');
const File = require('@definejs/file');
const Config = require('./lib/Config');
const Stat = require('./lib/Stat');
const Task = require('./rename/Task');



program.option('--config <file>', 'use a specific config file.');
program.option('-t, --type <type>', 'set define type.', 'module');
program.option('-o, --out <file>', 'output dest file.');
program.option('-a, --abbr', 'abbreviate the module id.');
program.parse(process.argv);


let id = program.args[0];
let newId = program.args[1];

if (!id || !newId) {
    console.log(`error: missing argument`.red);
    console.log('usage: webpart rename id newId.'.magenta);
    return;
}

let opts = program.opts();

//采用了目标模块 id 省略前缀的写法。
//例如：`webpart rename --abbr /Login/Main Main2 ` 
//或者：`webpart rename -a /Login/Main Main2`
//等于：`webpart rename /Login/Main /Login/Main2`
if (opts.abbr && id.includes('/')) {
    newId = id.split('/').slice(0, -1).join('/') + '/' + newId;
}


let config = Config.use('stat', opts);  //
let stat = Stat.parse(config);

let list = Task.rename(stat, id, newId);

if (!list) {
    console.log(`rename failed`.red);
    return;
}


list.forEach((item) => {
    File.write(item.file, item.newContent, null);

    //输出如：
    //rename: /Login/Main2 --> /Login/Main(htdocs/views/login/Login/Main.js)
    console.log(`rename:`, `${item.id}`.yellow, `-->`.green, `${item.newId}`.magenta, `(${item.file.underline.cyan})`);
});

console.log('rename all done!'.bold.green);



