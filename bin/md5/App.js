
const MD5 = require('@definejs/md5');
const Key$Value = require('../lib/Key$Value');


module.exports = {

    render(files, showRepeat) {
        let md5$file = {};

        files.forEach((file) => {
            let md5 = MD5.read(file);

            Key$Value.add(md5$file, md5, file);
        });

        Key$Value.render(md5$file, {
            'onlyArray': showRepeat,
        });
        

    },
};