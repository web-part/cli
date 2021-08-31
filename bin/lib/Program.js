
require('colors');

const console = require('@webpart/console');
const { Command, } = require('commander');
const $Object = require('@definejs/object');
const Config = require('./Program/Config');


module.exports = {

    parse(options = {}) {
        let program = new Command();

        options['--config <file>'] = 'use a specific config file.';


        $Object.each(options, function (key, desc) {
            if (key.startsWith('-')) {
                program.option(key, desc);
            }
            else if (key.startsWith('<') || key.startsWith('[')) {
                program.usage(key);
            }
        });

        program.parse();

        let args = program.args;
        let opts = program.opts();
        let config = Config.use(opts.config, options.config); //可能为空。
        

        //设置全局的 console 配置。
        if (config && config.console) {
            console.file = config.console.file;
        }

        return { program, opts, config, args, };
    },

    mergeConfig: Config.merge,

};