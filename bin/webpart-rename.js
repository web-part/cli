#!/usr/bin/env node

//用法：
//  webpart rename <id> <new-id>
//参数：
//  <id>        原模块 id。
//  <new-id>    新模块 id。
//选项：
//  -a, --abbr  输出的新模块 id 是否为短名称。
//示例：
// webpart rename --abbr /Login/Main Main2
//强依赖配置节点：
//  stat


const console = require('@webpart/console');
const File = require('@definejs/file');
const Program = require('./lib/Program');
const Stat = require('./lib/Stat');
const Task = require('./rename/Task');



let { opts, config, args, program, } = Program.parse({
    'config': true,
    '<id> <new-id>': '',
    '-a, --abbr': 'abbreviate the module id.',
});

if (args.length < 2) {
    return program.help();
}



let id = args[0];
let newId = args[1];


//采用了目标模块 id 省略前缀的写法。
//例如：`webpart rename --abbr /Login/Main Main2 ` 
//或者：`webpart rename -a /Login/Main Main2`
//等于：`webpart rename /Login/Main /Login/Main2`
if (opts.abbr && id.includes('/')) {
    newId = id.split('/').slice(0, -1).join('/') + '/' + newId;
}


let stat = Stat.parse(config.stat);
let list = Task.rename(stat, id, newId);

if (!list) {
    console.log(`Rename Failed`.red);
    return;
}


list.forEach((item) => {
    File.write(item.file, item.newContent, null);

    //输出如：
    //rename: /Login/Main2 --> /Login/Main(htdocs/views/login/Login/Main.js)
    console.log(`rename:`, `${item.id}`.yellow, `-->`.green, `${item.newId}`.magenta, `(${item.file.underline.cyan})`);
});

console.log('rename all done!'.bold.green);



