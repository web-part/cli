


const fs = require('fs');
const path = require('path');
const Patterns = require('@definejs/patterns');
const Config = require('../lib/Config');

function useDefault(files) {
    if (files.length > 0) {
        return files;
    }

    let config = Config.use('master');
    let dir = config['defaults'].htdocs;

    return [dir,];
}

module.exports = {

    get(files) {

        files = useDefault(files);


        let cwd = process.cwd();

        let patterns = files.map((file) => {
            let dest = path.join(cwd, file);

            if (!fs.existsSync(dest)) {
                return file;
            }

            //存在此项，为文件或目录。
            let stat = fs.statSync(dest);

            //是个文件。
            if (stat.isFile()) {
                return file;
            }

            //是个目录。
            if (stat.isDirectory()) {
                return file.endsWith('/') ? `${file}**/*.*` : `${file}/**/*.*`;
            }

            return file;
        });

 

        files = Patterns.getFiles(patterns);

      

        return files;

    },
};