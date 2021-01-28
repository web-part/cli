

const fs = require('fs');
const Directory = require('@definejs/directory');


module.exports = {

    init(dir, force) { 
        let home = (dir || '.') + '/';

        //尚未存在该目录。
        if (!fs.existsSync(home)) {
            Directory.create(home);
            return home;
        }

        //已存在该目录，检查是否为空目录。
        let items = fs.readdirSync(home);

        //空目录。
        if (items.length == 0) {
            return home;
        }


        //目标目录非空。
        if (force === true) { //指定了强制清空。
            Directory.clear(home);
            return home;
        }

        console.log(`Error: directory '${home}' is not empty.`.red);
        console.log(`Use '--force' option to clear the directory '${home}' if you want.`.red);
    },
};