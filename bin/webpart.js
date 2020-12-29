#!/usr/bin/env node
const { program, } = require('commander');
const pkg = require('../package.json');

program.storeOptionsAsProperties(false);
program.version(pkg.version, '-v, --version');
program.usage('<command> [options]');   //定义使用方法。

//定义命令。
program.command('init', 'generate a new project from a template.');
program.command('watch', 'compile website and watch files for development stage.');
program.command('build', 'compile website for production stage.');
program.command('babel', 'babel a file.');
program.command('stat', 'statistic files for module infomations.');
program.command('server', 'start a local web server for development stage. ');



//解析命令行参数。
program.parse(process.argv);
