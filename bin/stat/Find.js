const $String = require('@definejs/string');

function warn(id) {
    console.log(`Warning:`.bold.red, `duplicated define module`.red, `'${id.magenta}'`);
}

function showAll(id$file) {
    let ids = Object.keys(id$file);
    let len = ids.length.toString().length;

    ids.forEach((id, index) => {
        let file = id$file[id];
        let no = index + 1;

        no = $String.padLeft(no, len, '0');

        //一个 id 存在于多个文件，即重复定义了。
        if (Array.isArray(file)) {
            warn(id);

            file.forEach((file, index) => {
                console.log(`${no}.${index + 1}`.grey, id.red, '-->', file.cyan);
            });
        }
        else { //一对一关系。
            console.log(`${no}`.grey, id.green, '-->', file.cyan);
        }
    });
}



module.exports = {
    /**
    * 精确查找指定的模块所在的文件。
    * @param {*} id$file 
    * @param {*} ids 
    */
    exact(id$file, ids) {
        ids = Array.isArray(ids) ? ids : [ids];

        ids.forEach((id) => {
            let file = id$file[id];

            if (!file) {
                console.log(`Not Found:`.red, id.magenta);
                return;
            }

            //一个 id 存在于多个文件，即重复定义了。
            if (Array.isArray(file)) {
                warn(id);

                file.forEach((file, index) => {
                    console.log(`${index + 1}`.grey, id.red, '-->', file.cyan);
                });
            }
            else { //一对一关系。
                console.log(id.green, '-->', file.cyan);
            }
        });
    },

    /**
    * 模糊查找指定的模块所在的文件。
    * @param {*} id$file
    * @param {*} ids
    */
    all(id$file, ids) {
        if (ids === true) {
            showAll(id$file);
            return;
        }

        ids = Array.isArray(ids) ? ids : [ids];

        ids.forEach((id) => {
            let index = 0;

            Object.keys(id$file).forEach((mid) => {

                //id 可能为空串，表示 id 为 `(empty)` 模块。
                let found =
                    id && mid.includes(id) ||           //如果指定了具体不为空串的 id，则采用包含其在内的判断算法。
                    id === '' && mid.startsWith('/');   //如果指定了为空串，则采用以 `/` 开头的判断算法。

                if (!found) {
                    return;
                }

                let file = id$file[mid];

                //把关键词以外的部分标绿。
                let sids = mid.split(id).map((sid) => {
                    return sid.green;
                });

                //再把关键词标粉红。
                mid = sids.join(id.magenta);
                index++;



                //一个 id 存在于多个文件，即重复定义了。
                if (Array.isArray(file)) {
                    warn(mid);

                    file.forEach((file, no) => {
                        console.log(`${index}.${no + 1}`.grey, mid.red, '-->', file.cyan);
                    });
                }
                else { //一对一关系。
                    console.log(`${index}`.grey, mid, '-->', file.cyan);
                }
            });
        });

    },

    repeatValues(key$value) {
      
        let count = 0;

        Object.keys(key$value).forEach((key) => {
            let value = key$value[key];

            if (!Array.isArray(value)) {
                return;
            }

            count++;
            // console.log(`Warning:`.red, key.magenta, ' has more than 1 values:'.red);

             console.log(key.red, '-->');
            //此时 value 是一个数组。
            value.forEach((value, index) => {
                console.log(`  ${count}.${index + 1}`.grey, value.cyan);
            });

            // console.log(key.red, ':', value);
            // // console.log(value);

        });

        if (count == 0) {
            console.log(`Not Found`.green);
        }
    },
};