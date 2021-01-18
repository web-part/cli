

module.exports = {

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
    * 
    * @param {*} key$value 
    * @param {*} opts 
    */
    render(key$value, opts) {
        let { onlyArray, keys, tabs, } = opts || {};
        let skey$value = {};

        keys = keys || [];
        tabs = tabs > 0 ? Array(tabs + 1).join(' ') : '';
        

        //指定了只处理部分 key，则先提取出来。
        if (keys.length > 0) {
            keys.forEach((key) => {
                skey$value[key] = key$value[key];
            });
        }
        else { //否则处理全部 key。
            skey$value = key$value;
        }


        Object.keys(skey$value).forEach((key) => {
            let value = key$value[key];
            let isArray = Array.isArray(value);

            if (!isArray && onlyArray) {
                return;
            }

            if (!isArray) {
                console.log(`${tabs}${key.green}:`, value.underline.cyan);
                return;
            }


            let values = value;
            let maxIndex = values.length - 1;

            console.log(`${tabs}${key.red}:`);

            values.forEach((value, index) => {
                let prefix = index == maxIndex ? `└──` : `├──`;

                console.log(`${tabs}${prefix}`, value.underline.cyan);
            });
        })
    },
};