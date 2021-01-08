

const path = require('path');
const { execSync, } = require('child_process');
const Directory = require('@definejs/directory');


const TEMP = path.join(__dirname, '__'); //用来产生对应的目录结构的临时目录。



module.exports = exports = {
    
    get(ids, node) { 
        //指定了特定的节点作为树根，则先过虑出来。
        if (typeof node == 'string') {
            ids = ids.filter((id) => {
                return id == node || id.startsWith(node + '/');
            });
        }

        if (!ids.length) {
            console.log('ids.length ZERO'.red);
            return;
        }
        

        //先删除可能存在的临时目录。
        Directory.delete(TEMP);

        ids.map((id) => {
            if (id.startsWith('/')) {
                id = '(empty)' + id;
            }

            let file = path.join(TEMP, id);
            let dir = file + '/';
          
            Directory.create(dir); //以目录方式更安全。
        });


        let stdout = execSync('tree', { 'cwd': TEMP, });
        let output = stdout.toString();


        //删除已经创建的临时目录。
        Directory.delete(TEMP);

        return output;


    },


    render(ids, node) { 
        let tree = exports.get(ids, node);

        console.log(tree || '');
    },
};