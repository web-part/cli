#!/usr/bin/env node

//用法：
//  webpart qr [dir] 打开指定虚拟目录对应的二维码页面。
//参数：
//  [dir] 可选，静态目录。
//示例：
//  webpart qr htdocs        
//  webpart qr build
//强依赖配置节点：
//  server

const Program = require('./lib/Program');
const Server = require('./qr/Server');
const Session = require('./qr/Session');


let { args, config, } = Program.parse({
    'config': undefined,
});

let server = config.server || {};
let { session, qrcdoe, } = server;

if (!session) {
    Server.start(args);
    return;
}

console.log(args, config);