
const path = require('path');
const Directory = require('@definejs/directory');
const File = require('@definejs/file');


function merge(home, obj) {
    let file = path.join(home, 'package.json');
    let json = File.readJSON(file);

    Object.assign(json, obj);
    File.writeJSON(file, json);
}

module.exports = {


    render({ home, project, pkg, }) {
        let node_modules = path.join(home, `node_modules/`);    //如 `test/node_modules/`。
        let pkgDir = path.join(node_modules, `${pkg}/`);        //如 `test/node_modules/@webpart/template-pc/`。
        let pkgLock = path.join(home, `package-lock.json`);     //如 `test/package-lock.json`。
        let sampleDir = path.join(home, `sample/`);             //如 `test/sample/`。
        let gitignore = path.join(home, `gitignore.txt`);       //如 `test/gitignore.txt`。


        Directory.copy(pkgDir, home);                   //
        Directory.copy(sampleDir, home);                //
        File.copy(gitignore, `${home}.gitignore`);      //重命名为 `.gitignore`。



        Directory.delete(sampleDir);
        Directory.delete(node_modules);
        File.delete(pkgLock);
        File.delete(gitignore);


        if (project) {
            merge(home, {
                'name': project,
            });
        }
        

    },
};