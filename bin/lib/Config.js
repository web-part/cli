
const path = require('path');
const fs = require('fs');

let all = 'webpart.config.js';
let mid$file = {};  //子模块对应的配置文件名。 如 `server`、`stat` 等子命令对应的模块要使用的配置文件。

/**
* 从相对于当前的工作目录加载指定的模块。
* @param {string} file 要加载的模块文件名。
*/
function requireFromCwd(file) {
    let cwd = process.cwd();
    let dest = path.join(cwd, file);

    return fs.existsSync(dest) ? require(dest): {};
}



module.exports = exports = {

    set(mid, file) { 
        switch (arguments.length) {
            //重载 set(file); 设置全局的配置文件名。
            case 1:
                all = mid;
                break;
            
            //设置具体某个子模块的配置文件名。
            case 2:
                mid$file[mid] = file;
                break;
            
            default:
                throw new Error(`arguments error. Usage: set(file) or set(mid, file);`);

        }
        
    },

    get(mid, moreConfig, keys) { 
        let file = all;         //先假设是从默认配置文件里取。
        let isDefault = true;   //指示要读取的文件是否为默认的配置文件。

        if (mid) {  //指定了具体的模块名。
            file = mid$file[mid]; //尝试去检索对应的记录。

            if (file) { //确实存在该模块对应的配置文件记录。
                isDefault = false; //说明不是默认的。
            }
            else {
                file = all; //没有存在记录，则取回默认的。
            }
        }

        let config = requireFromCwd(file);

        if (isDefault && mid) {
            config = config[mid] || {};
        }
       

        
        //额外提供了需要扩展（合并）的其它配置对象，则合并。
        if (moreConfig) {
            keys = keys || Object.keys(moreConfig);

            keys.forEach((key) => {
                let value = moreConfig[key];

                if (value !== undefined) {
                    config[key] = value;
                }
            });

            
        }


        return config;

     
    },


    use(mid, opts, keys) {
        let file = opts ? opts.config : '';

        if (file) {
            exports.set(mid, file);
        }

        return keys && keys.length > 0 ?
            exports.get(mid, opts, keys) :
            exports.get(mid);
        
    },
    
};