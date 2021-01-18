
require('colors');


const program = require('commander');
const Config = require('./lib/Config');
const Files = require('./md5/Files');
const App = require('./md5/App');

program.option('-r, --repeat', 'show repeat only.');
program.parse(process.argv);


let opts = program.opts();
let files = Files.get(program.args);

App.render(files, opts.repeat);


