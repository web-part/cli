#!/usr/bin/env node
const { program, } = require('commander');
const pkg = require('../package.json');

program.storeOptionsAsProperties(false);
program.version(pkg.version, '-v, --version');

//定义使用方法。
program.usage('<command> [options]');

//定义命令。
program.command('init', 'generate a new project from a template.');
program.command('watch', 'compile website and watch files for development stage.');
program.command('build', 'compile website for production stage.');
program.command('babel', 'babel a file.');

//解析命令行参数。
program.parse(process.argv);
