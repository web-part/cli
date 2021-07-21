
const console = require('@webpart/console');

module.exports = exports = {

    add(key$value, key, value) {
        
        let has = key in key$value;

        if (!has) {
            key$value[key] = value;
            return;
        }

        let old = key$value[key];


        if (old === value) {
            return;
        }

        if (Array.isArray(old)) {
            old.push(value);
            return;
        }

        //
        key$value[key] = [old, value,];

    },

    /**
    * 
    * 已重载 each(key$value, opts, fn);
    * 已重载 each(key$value, fn);
    * @param {*} key$value 
    * @param {*} opts
    *   opts = {
    *       keys: [],           //需要过滤出来的键列表。
    *       onlyArray: false,   //是否仅显示值为数组的项。
    *   };
    */
    each(key$value, opts, fn) {
        if (typeof opts == 'fn') {
            fn = opts;
            opts = null;
        }


        let { onlyArray, keys, } = opts || {};
        let skey$value = {};

        //指定了只处理部分 key，则先提取出来。
        if (keys && keys.length > 0) {
            keys.forEach((key) => {
                if (key in key$value) {
                    skey$value[key] = key$value[key];
                }
                else {
                    console.log(`Not Found: ${key}`.red);
                }
            });
        }
        else { //否则处理全部 key。
            skey$value = key$value;
        }


        let list = Object.keys(skey$value);

        list.forEach((key, index) => {
            let value = skey$value[key];
            let isArray = Array.isArray(value);

            if (!isArray && onlyArray) {
                return;
            }

            fn(key, value, index, list);
        })
    },



    /**
    * 
    * 
    * @param {Object} key$value 
    * @param {Object} opts
    *   opts = {
    *       keys: [],           //需要过滤出来的键列表。
    *       tabs: 0,            //缩进的空格数。
    *       onlyArray: false,   //是否仅显示值为数组的项。
    *   };
    */
    render(key$value, opts = {}) {

        let { tabs, } = opts;

        tabs = tabs > 0 ? Array(tabs + 1).join(' ') : '';

        exports.each(key$value, opts, function (key, value, index, list) {
            let isArray = Array.isArray(value);

            if (!isArray) {
                console.log(`${tabs}${key.green}`, `→ `, value.underline.cyan);
                return;
            }

            let values = value;
            let maxIndex = values.length - 1;

            console.log(`${tabs}${key.red}:`);

            values.forEach((value, index) => {
                let prefix = index == maxIndex ? `└──` : `├──`;

                console.log(`${tabs}${prefix}`, value.underline.cyan);
            });
        });
        


        
    },
};