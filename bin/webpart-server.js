#!/usr/bin/env node

require('colors');

const { program, } = require('commander');
const server = require('@webpart/server');
const Config = require('./lib/Config');


program.option('-p, --port <port>', 'set a port for the server.');
program.option('-o, --open', 'auto open browser when server is runnig.');
program.option('--config <file>', 'use a specific config file.');
program.parse(process.argv);



let opts = program.opts();

let config = Config.use('server', opts, [
    'port',
    'open',
]);

config.port = config.port || 8000;

config.statics = config.statics || {
    '/': './',
};

server.start(config);