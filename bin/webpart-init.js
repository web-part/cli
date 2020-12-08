#!/usr/bin/env node
require('colors');

const { program, } = require('commander');
const ora = require('ora');
const download = require('download-git-repo');
const loading = ora("Downloading...");


program.usage('<template-name> [project-name]');
program.parse(process.argv);

if (program.args.length < 1) {
    return program.help();
}

let type = program.args[0];
let dir = program.args[1] || '.';       //不指定项目名称，则以当前目录为值。
let url = `web-part/template-${type}`;  //github 上的地址。

console.log('Start generating from'.cyan, `https://github.com/${url}`.yellow);

// 出现加载图标
loading.start();


download(url, dir, (error) => {
    if (error) {
        loading.fail();
        console.log(`Generation failed. ${error}`.red);
        return;
    }

    loading.succeed();

    console.log('Generation completed!'.green);

    //如果指定了子目录，则提示进入该目录。
    if (dir != '.') {
        console.log('To get started');
        console.log(`cd ${dir}`);
    }

});