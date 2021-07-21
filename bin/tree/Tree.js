

const console = require('@webpart/console');
const Tree = require('@definejs/tree');

function add(id$count, id) {
    let count = id$count[id] || 0;

    count = id$count[id] = count + 1;
    return count;
}


module.exports = exports = {
    
    render(ids, node, id$file) { 
        //指定了特定的节点作为树根，则先过虑出来。
        if (typeof node == 'string') {
            let prefix = `${node}/`;
            ids = ids.filter((id) => {
                return id == node || id.startsWith(prefix);
            });
        }

        if (!ids.length) {
            console.log('ids.length = 0'.red);
            return;
        }

        ids = ids.map((id) => {
            return id.startsWith('/') ? `${id}` : id;
        });


        let tree = new Tree();
        let id$count = {};

        ids.forEach((id) => {
            let count = add(id$count, id);
            let keys = id.split('/');
            tree.set(keys, count);
        });



        tree.render(function (node, info) {
            let { key, nodes, keys, value, } = node;
            let { tabs, linker, content, } = info;
            let id = keys.join('/');

            key = key || '(empty)';


            if (!id$file) {
                if (value > 1) {
                    console.log(`${tabs.yellow}${linker.yellow} ${key.bold.red} (${value.toString().bold.red})`);
                }
                else {
                    console.log(`${tabs.yellow}${linker.yellow} ${key}`);
                }
                return;
            }
           

            let file = id$file[id] || ''; //可能是一个数组。

            
            if (Array.isArray(file)) {
                key = `${key.bold.red} (${value.toString().bold.red})`;

                file = file.map(function (file) {
                    return file.underline.red;
                }).join(', ');
            }
            else {
                key = key.bold;
                file = file.underline.grey;
            }
           

            console.log(`${tabs.yellow}${linker.yellow} ${key} ${file}`);


        });

        // console.log(ids);

        

        



    },


   
};