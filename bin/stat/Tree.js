

const path = require('path');
const { execSync, } = require('child_process');
const Directory = require('@definejs/directory');


const TEMP = path.join(__dirname, '__'); //用来产生对应的目录结构的临时目录。



module.exports = {
    
    get(ids) { 

        //先删除可能存在的临时目录。
        Directory.delete(TEMP);

        ids.map((id) => {
            if (id.startsWith('/')) {
                id = '(app)' + id;
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
};