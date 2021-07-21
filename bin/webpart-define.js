#!/usr/bin/env node

//用法：
//  webpart define <module-id> [dest-file]
//参数：
//  <module-id>     必选，要定义的模块 id。
//  [dest-file]     可选，要输出的目标文件。
//选项：
//  --type <type>   要定义的模块类型，可用的值有：`module`、`panel`、`view`，默认为 `module`。
//示例：
//  webpart define API
//  webpart define /Home --type view
//  webpart define /Home/Main --type panel
//强依赖配置节点：
//  define



const console = require('@webpart/console');
const path = require('path');
const $String = require('@definejs/string');
const File = require('@definejs/file');
const Program = require('./lib/Program');


let { opts, args, config, } = Program.parse({
    'config': true,
    '<module-id> [dest-file]': '',
    '--type <type>': 'set define type.',
});



let id = args[0];
let file = args[1];
let type = opts.type || 'module';
let sample = config.define[type];

if (!id) {
    console.log(`Error:`.bold.red, `missing argument <module-id>`.red);
    return;
}

if (!sample) {
    console.log(`Error:`.bold.red, `template not found: '${type}'`.red);
    return;
}


let content = $String.format(sample, { 'id': id, });

if (file) {
    let ext = path.extname(file);

    if (ext != '.js') {
        file = path.join(file, `${id}.js`);
    }

    if (File.exists(file)) {
        console.log(`Existed:`.bold.red, file.underline.cyan);
        return;
    }

    File.write(file, content, null);
    console.log(`Created:`.bold.green, file.underline.cyan);
}
else {
    console.log(content.blue);
}












