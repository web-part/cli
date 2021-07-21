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

const Session = require('@webpart/server-session');
const Program = require('./lib/Program');

const open = require('open');


let { args, config, } = Program.parse({
    'config': true,
});

let { session, qr, } = config.server;

if (!session || !qr) {
    return;
}

let value = args[0] || '';
if (!value.startsWith('/')) {
    value = '/' + value;
}

Session.test(session, {
    success: function (data) {
        console.log('success----------:'.green, data);
        // console.log(config.server);

        let { host, port, } = data.server;
        let { path, } = qr;
        let url = `http://${host}:${port}${path}${dir}`;

        // open(url);



    },
    fail: function (...args) {
        console.log('fail----------:'.yellow,...args);

    },

    error: function (...args) {
        console.log('error:------'.red);
    }

})


