
#!/usr/bin / env node

//用法：
//  webpart qr [dir] 打开指定虚拟目录对应的二维码页面。
//参数：
//  [dir] 可选，静态目录。
//示例：
//  webpart qr htdocs        
//  webpart qr build
//强依赖配置节点：
//  server

const openUrl = require('open');
const Core = require('@webpart/server-core');
const qrcode = require('@webpart/server-qrcode');





module.exports = {
    start(args) {

        let suffix = args[0] || '';

        Core.start(function (app, { host, port, }) {
            let baseUrl = host ? `http://${host}:${port}` : '';

            let { path, } = qrcode.start(app, {
                baseUrl,
            });

            let url = `http://localhost:${port}${path}`;

            openUrl(url);

        });
    },
};
