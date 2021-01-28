const $String = require('@definejs/string');
const Key$Value = require('../lib/Key$Value');


module.exports = {
    /**
    * 精确查找指定的模块所在的文件。
    * @param {*} id$file 
    * @param {*} ids 
    */
    exact(id$file, id) {
        Key$Value.render(id$file, {
            'keys': [id,],
        });
    },

    repeat(key$value, sid) {
        let keys = sid ? Object.keys(key$value).filter((key) => {
            return key.includes(sid);
        }) : [];

        Key$Value.render(key$value, {
            'onlyArray': true,
            'keys': keys,
        });
    },

    /**
    * 模糊查找指定的模块所在的文件。
    * @param {*} id$file
    * @param {string} sid 要搜索的 id 或其子串。
    */
    all(id$file, sid) {

        let mid$file = null;

        Object.keys(id$file).forEach((id) => {
            //id 可能为空串，表示 id 为 `(empty)` 模块。
            let found =
                sid && id.includes(sid) ||          //如果指定了具体不为空串的 sid，则采用包含其在内的判断算法。
                sid === '' && id.startsWith('/');   //如果指定了为空串，则采用以 `/` 开头的判断算法。

            if (!found) {
                return;
            }

            let file = id$file[id];

            //把关键词以外的部分标绿。
            let list = id.split(sid).map((item) => {
                return item.green;
            });

            //再把关键词标粉红。
            let mid = list.join(sid.magenta);
            mid$file = mid$file || {};

            Key$Value.add(mid$file, mid, file);
        });

        if (mid$file) {
            Key$Value.render(mid$file);
        }
        else {
            console.log(`Not Found:`.red, `${sid.magenta}`);
        }
    },


};