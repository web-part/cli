
const fs = require('fs');
const Patterns = require('@definejs/patterns');


module.exports = {

    get(files) {

        let patterns = files.map((file) => {
            if (file.includes('*')) {
                return file;
            }

            //存在此项，为文件或目录。
            let stat = fs.statSync(file);

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
        // files = [...new Set(files)];

        return files;

    },
};