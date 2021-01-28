
const path = require('path');


module.exports = {


    /**
    * 根据输入的源文件名自动计算出对应的目标文件名。
    * 主要想在保留 `.debug.js` 或 `.min.js` 的提下，生成 `.babel.debug.js` 或 `.babel.min.js`。
    * @param {string} src 输入的源文件名。
    */
    get(src) { 
        let originExt = path.extname(src);          //如 `.js`。
        let debugExt = '.debug' + originExt;        //如 `.debug.js`。
        let minExt = '.min' + originExt;            //如 `.min.js`。

        let ext =
            src.endsWith(debugExt) ? debugExt :
            src.endsWith(minExt) ? minExt :
            originExt;

        let pos = 0 - ext.length;               //如 -9。
        let ext2 = '.babel' + ext;              //如 `.babel.debug.js`。
        let dest = src.slice(0, pos) + ext2;    //如 `f/kisp/kisp.babel.debug.js`。

        return dest;

    },
};
