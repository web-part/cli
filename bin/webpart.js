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
program.command('md5', 'md5 a file.');
program.command('stat', 'statistic files for module infomations.');
program.command('server', 'start a local web server for development stage. ');
program.command('find', 'find a module to its file.');
program.command('tree', 'stat modules output their ids ad a tree.');
program.command('list', 'stat modules output their ids ad a list.');
program.command('info', 'stat module info with specific id.');
program.command('define', 'define a module.');
program.command('rename', 'rename a module and its children.');
program.command('pair', 'pair match JS module and HTML module.');

//解析命令行参数。
program.parse(process.argv);
