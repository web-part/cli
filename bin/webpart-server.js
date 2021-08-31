#!/usr/bin/env node

//用法：
//  webpart server      用默认端口以当前目录为根目录创建一个服务器。
//选项：
//  -p, --port <port>   使用指定的端口号。
//  -o, --open          完成后自动打开浏览器。
//示例：
//  webpart server
//  webpart server --port 8011
//  webpart server --open
//  webpart server --open --port 8011
//弱依赖配置节点：
//  server

require('colors');

const server = require('@webpart/server');
const openUrl = require('open');
const Program = require('./lib/Program');

let { opts, config, } = Program.parse({
    'config': undefined, //可以有。 如果有则用，否则不要求。
    '-p, --port <port>': 'set a port for the server.',
    '-o, --open': 'auto open browser when server is runnig.',
});


let cfg = Program.mergeConfig(config.server, opts, ['port',]);
let done = cfg.done;


server.start(cfg, function (app, info) {
    if (opts.open) {
        openUrl(`http://localhost:${info.port}`);
    }

    done && done(app, info);
});