#!/usr/bin/env node

//用法：
//  webpart env [name]   查找指定环境的所有文件。
//选项：
//  -a, --all       使用模糊匹配模式来查找全部相关的模块。 
//  -r, --repeat    查找重复定义的模块或一个文件里定义了多个模块的文件。
//示例：
//  webpart env dev
//  webpart env prd



const console = require('@webpart/console');
const Env = require('@webpart/env');
const Program = require('./lib/Program');



let { opts, args, config, program, } = Program.parse({
    'config': true,
    '[name]': '',
});

let defaults = config.master[''];
let name = args[0];

if (name && !defaults.env[name]) {
    console.log(`不存在名为 ${name} 的环境节点`.red);
    return;
}


let env = new Env(defaults.env);
let name$env = env.stat(defaults.htdocs);

if (name) {
    render(name);
}
else {
    Object.keys(name$env).forEach(render);
}

function render(name) {
    let { patterns, files, } = name$env[name];
    let maxIndex = files.length - 1;

    console.log(`${name.bold}:`, patterns);

    files.forEach((file, index) => {
        let prefix = index == maxIndex ? `└──` : `├──`;
        console.log(`${prefix}`, file.underline.cyan);
    });

}







