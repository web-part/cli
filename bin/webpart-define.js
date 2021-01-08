#!/usr/bin/env node
require('colors');

const { program, } = require('commander');
const path = require('path');
const $String = require('@definejs/string');
const File = require('@definejs/file');
const Config = require('./lib/Config');



program.option('--config <file>', 'use a specific config file.');
program.option('-t, --type <type>', 'set define type.', 'module');
program.option('-o, --out <file>', 'output dest file.');
program.parse(process.argv);


let opts = program.opts();
let config = Config.use('define', opts);  //
let id = program.args[0];
let file = program.args[1];
let type = opts.type;
let sample = config[type];

if (!id) {
    console.log(`error: argument missing 'module-id'`.red);
    return;
}

if (!sample) {
    console.log(`error: template not exists: '${type}'`.red);
    return;
}


let content = $String.format(sample, { 'id': id, });

if (file) {
    let ext = path.extname(file);

    if (ext != '.js') {
        file = path.join(file, `${id}.js`);
    }

    if (File.exists(file)) {
        console.log(`dest file is already existed:`.red, file.red);
        return;
    }

    File.write(file, content, null);
    console.log(`File created:`.green, file.cyan);
}
else {
    console.log(content.grey);
}












