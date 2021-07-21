
require('colors');

const path = require('path');
const fs = require('fs');
const NAME = 'webpart.config.js';


module.exports = exports = {


    use(file, mustRequired) {
        //明确指定了不需要。
        if (mustRequired === false) {
            return null;
        }

        let cwd = process.cwd();
        let dest = path.join(cwd, file || NAME);

        if (fs.existsSync(dest)) {
            return require(dest);
        }

        //明确指定了需要，且不存在文件，则提示。
        if (mustRequired === true) {
            console.log(`Not Found:`.bold.red, `${dest.underline.red}`);
            process.exit();
        }

        //没有明确指定需要，则返回一个空的 {}。
        return {};

        
    },


    merge(config, moreConfig, keys) { 
        config = config || {};
        keys = keys || Object.keys(moreConfig);

        keys.forEach((key) => {
            let value = moreConfig[key];

            if (value !== undefined) {
                config[key] = value;
            }
        });

        return config;
    },

    
};