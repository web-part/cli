#!/usr/bin/env node
const { program, } = require('commander');
const pkg = require('../package.json');

program.storeOptionsAsProperties(false);
program.version(pkg.version, '-v, --version');
program.usage('<command> [options]');   //定义使用方法。

//定义命令。
program.command('babel', 'babel a file.');
program.command('build', 'compile website for production stage.');
program.command('compile', 'compile website for development stage.');
program.command('find', 'find a module to its file.');
program.command('info', 'stat module info with specific id.');
program.command('init', 'generate a new project from a template.');
program.command('list', 'stat modules output their ids ad a list.');
program.command('md5', 'md5 a file.');
program.command('minify', 'minify js、css、html、json files.');
program.command('pair', 'pair match JS module and HTML module.');
program.command('parse', 'parse website.');
program.command('rename', 'rename a module and its children.');
program.command('require', 'find who require the module.');
program.command('server', 'start a local web server for development stage. ');
program.command('tree', 'stat modules and output their ids ad a tree.');
program.command('watch', 'compile website and watch files for development stage.');

//解析命令行参数。
program.parse(process.argv);
