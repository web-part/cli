

const Key$Value = require('../lib/Key$Value');
const $String = require('@definejs/string');

module.exports = {

    render({ ids, id$file, node, showFile, showIndex, }) {
        //指定了特定的节点作为树根，则先过虑出来。
        if (typeof node == 'string') {

            ids = ids.filter((id) => {
                return id == node || id.includes(node);
            });

            // ids = ids.map(function (id) {
            //     return id.split(node).join(node.bold);
            // });
        }


        Key$Value.each(id$file, { 'keys': ids, }, function (id, file, index, list) {
            let width = list.length.toString().length;;
            let order = $String.padLeft(`${index + 1}`, width, '0'); //位数不足的，前面补 0。

            if (typeof node == 'string') {
                id = id.split(node).join(node.bold);
            }

            if (!Array.isArray(file)) {
                let args = [];

                if (showIndex) {
                    args = [...args, `${order.grey}`,];
                }

                
                args = [...args, `${id.green}`,];

                if (showFile) {
                    args = [...args, `→ `, file.underline.cyan];
                }

                console.log(...args);
                return;
            }


            
            //一个模块出现在多个文件的，不管是否指定 showFile，都打印所在的文件。
            let files = file;
            let maxIndex = files.length - 1;


            if (showIndex) {
                console.log(`${order.grey}`, `${id.red}:`);
            }
            else {
                console.log(`${id.red}:`);
            }

            files.forEach((file, index) => {
                let prefix = index == maxIndex ? `└──` : `├──`;

                if (showIndex) {
                    let tabs = new Array(width + 1).join(' ');
                    prefix = `${tabs}${prefix}`;
                }

                console.log(`${prefix}`, file.underline.cyan);
            });
        });




    },
};