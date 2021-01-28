
require('colors');

const { execFile, } = require('child_process');


module.exports = function (cmd, args) { 

    args = [cmd, ...args];

    //实际调用的是如 `webpart stat --tree [id]` 之类的。
    execFile('webpart', args, function (error, stdout) {
        console.log(stdout);

        if (error) {
            console.log(error.message.red);
        }

    });
};