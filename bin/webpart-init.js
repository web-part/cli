#!/usr/bin/env node
require('colors');

const path = require('path');
const { program, } = require('commander');
const ora = require('ora');
const download = require('download-git-repo');
const File = require('@definejs/file');


program.usage('<template-name> [project-name]');
program.parse(process.argv);

if (program.args.length < 1) {
    return program.help();
}


let loading = ora();
let type = program.args[0];             //模板类型。 如 `compat`。
let dir = program.args[1] || '.';       //项目名称。 如果不指定，则以当前目录为值。
let url = `web-part/template-${type}`;  //github 上的地址。


console.log('Start generating...'.blue);

// 出现加载图标
loading.start('Downloading from ' + `https://github.com/${url}`.cyan);


download(url, dir, (error) => {
    if (error) {
        loading.fail();
        console.log(`Generation failed. ${error}`.red);
        return;
    }

    loading.succeed();

    mergePackageJSON(dir, { 'name': dir, });

    console.log('Generation completed!'.green);
    console.log('To get started, run command:');

    //如果指定了子目录，则提示进入该目录。
    if (dir != '.') {
        console.log(`cd ${dir}`.yellow);
    }

    console.log('npm install'.yellow);

});


//合并（改写）package.json 文件。
function mergePackageJSON(dir, data) {
    let file = path.join(dir, './package.json');
    let json = File.readJSON(file);

    Object.assign(json, data);

    File.writeJSON(file, json);
}