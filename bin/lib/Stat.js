const File = require('@definejs/file');
const { Module, HTML, Analyser, } = require('@webpart/stat');
const path = require('path');

module.exports = {

    parse(config, destDir) {
        let { dir } = config;

        let moduleInfos = Module.stat(dir, config.module);               //最全面的原始信息。
        let moduleStat = Analyser.stat(moduleInfos);

        let htmlInfos = HTML.stat(dir, config.html);
        let htmlStat = Analyser.stat(htmlInfos);


        if (destDir) {
            Object.keys(moduleStat).forEach((key) => {
                let file = path.join(destDir, `/module/${key}.json`);
                File.writeJSON(file, moduleStat[key]);
            });

            Object.keys(htmlStat).forEach((key) => {
                let file = path.join(destDir, `/html/${key}.json`);
                File.writeJSON(file, htmlStat[key]);
            });
        }

        return {
            moduleStat,
            htmlStat,
        };

    },


    tryWarnDuplicated(id, list, fn) { 
        if (list === undefined) {
            console.log(`Not exist module:`.red, id.magenta);
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