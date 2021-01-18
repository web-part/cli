
const fs = require('fs');
const path = require('path');
const MD5 = require('@definejs/md5');
const Key$Value = require('../lib/Key$Value');




function parse(files) {
    let md5$file = {};
    let cwd = process.cwd();

    files.forEach((file) => {
        let dest = path.join(cwd, file);
        let md5 = MD5.read(dest);

        Key$Value.add(md5$file, md5, file);
    });

    return md5$file;
}



module.exports = {

    render(files, onlyArray) {

        let md5$file = parse(files);

        Key$Value.render(md5$file, {
            'onlyArray': onlyArray,
        });
        

    },
};