const console = require('@webpart/console');
const File = require('@definejs/file');
const MD5 = require('@definejs/md5');
const { Module, HTML, Analyser, } = require('@webpart/stat');
const path = require('path');



function write(output, type, infos, stat) {
    let home = path.join(output, `/${type}/`);      //如 `output/stat/module/`。
    let file = `${home}infos.json`;                 //如 `output/stat/module/infos.json`。
    let changed = true;

    if (File.exists(file)) {
        let json = JSON.stringify(infos, null, 4);
        let a = MD5.get(json);
        let b = MD5.read(file);

        changed = (a != b);
    }

    if (!changed) {
        return;
    }

    Object.keys(stat).forEach((key) => {
        let file = `${home}${key}.json`;

        File.writeSortJSON(file, stat[key]);
    });
}

module.exports = {

    parse(config) {
        let { htdocs, output, } = config;

        let moduleInfos = Module.stat(htdocs, config.module);               //最全面的原始信息。
        let moduleStat = Analyser.stat(moduleInfos);

        let htmlInfos = HTML.stat(htdocs, config.html);
        let htmlStat = Analyser.stat(htmlInfos);


        if (output) {
            write(output, 'module', moduleInfos, moduleStat);
            write(output, 'html', htmlInfos, htmlStat);
        }

        return {
            moduleStat,
            htmlStat,
        };

    },


    tryWarnDuplicated(id, list, fn) { 
        if (list === undefined) {
            console.log(`Module Not Found:`.bold.red, id.magenta);
            process.exit();
        }

        if (Array.isArray(list)) {
            if (list.length > 1) {
                console.log(`Warn: duplicated define module`.red, `'${id.magenta}'`, `(${list.length})`.bold.red);
                list.forEach(fn);
            }
            else {
                fn(list[0]);
            }
        }
        else {
            fn(list);
        }
        
        
        

    },


};